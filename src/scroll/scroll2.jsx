// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ProductsItem } from '../ProductsItem/ProductsItem';
// import { productListThunk } from '../../../redux/products/operations';
// import {
//   selectFilter,
//   selectProductsList,
// } from '../../../redux/products/selectors';
// import { ProductCard, ProductsListContainer } from './ProductsList.styled';
// import ProductsNotFound from '../ProductsNotFound/ProductsNotFound';
// import { selectUserBlood } from '../../../redux/userProfile/selectors';
// import InfiniteScroll from 'react-infinite-scroll-component';

// export const ProductsList = () => {
//   const dispatch = useDispatch();

//   const list = useSelector(selectProductsList);
//   const bloodGroup = useSelector(selectUserBlood);
//   const filter = useSelector(selectFilter);
//   const { search, category, recomended } = filter;

//   const [page, setPage] = useState(1);

//   const hasMore = () => {
//     if (!list || list.length === 0) {
//       return false;
//     }

//     const lastPage = Math.ceil(list.length / 24);

//     return page < lastPage;
//   };

//   const fetchMoreData = () => {
//     if (hasMore()) {
//       dispatch(
//         productListThunk({
//           recomended: recomended.value,
//           category: category.value,
//           search,
//           page: page + 1,
//         })
//       ).then(response => {
//         if (
//           !response.payload.products ||
//           response.payload.products.length === 0
//         ) {
//           setHasMore(false);
//         } else if (response.payload.isLastPage) {
//           setHasMore(false);
//         }
//       });
//       setPage(prevPage => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     dispatch(
//       productListThunk({
//         search,
//         category: category.value,
//         recomended: recomended.value,
//         page,
//       })
//     );
//   }, [dispatch, search, category, recomended, page]);

//   return (
//     <ProductsListContainer>
//       {list.length === 0 ? (
//         <ProductsNotFound />
//       ) : (
//         <InfiniteScroll
//           dataLength={list.length}
//           next={fetchMoreData}
//           hasMore={hasMore}
//           getProductsOnPage={page => list.slice(page * 24, (page + 1) * 24)}
//           loader={<h4>Loading...</h4>}
//           endMessage={<p>No more products</p>}
//         >
//           {list.map(
//             ({
//               _id,
//               weight,
//               calories,
//               category,
//               title,
//               groupBloodNotAllowed,
//             }) => (
//               <ProductCard key={_id}>
//                 <ProductsItem
//                   id={_id}
//                   weight={weight}
//                   calories={calories}
//                   category={category}
//                   title={title}
//                   isRecomended={
//                     !groupBloodNotAllowed[bloodGroup] ? true : false
//                   }
//                 />
//               </ProductCard>
//             )
//           )}
//         </InfiniteScroll>
//       )}
//     </ProductsListContainer>
//   );
// };

//=============================================
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productListThunk } from '../../../redux/products/operations';
import {
  selectFilter,
  selectProductsList,
} from '../../../redux/products/selectors';
import { ProductCard, ProductsListContainer } from './ProductsList.styled';
import ProductsNotFound from '../ProductsNotFound/ProductsNotFound';
import { selectUserBlood } from '../../../redux/userProfile/selectors';
import { useInView } from 'react-intersection-observer';
// import { setStates } from 'src/redux/';

export const ProductsList = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectProductsList);
  const bloodGroup = useSelector(selectUserBlood);
  const filter = useSelector(selectFilter);
  const { search, category, recomended } = filter;
  const [page, setPage] = useState(1);
  const hasMoreRef = useRef(true);
  const lastProductRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newResponse, setNewResponse] = useState(true);
  const productListRef = useRef();

  const { ref } = useInView({
    onChange: inView => {
      if (inView && newResponse) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    },
  });

  useEffect(() => {
    if (productListRef.current) {
      productListRef.current.scrollTop = 0;
    }
    setCurrentPage(1);
    setNewResponse(true);
    setCurrentFilter(filter);
  }, [filter, ref]);

  useEffect(() => {
    dispatch(
      productListThunk({
        search,
        category: category.value,
        recomended: recomended.value,
        page,
      })
    );
  }, [dispatch, search, category, recomended, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts({
          page: currentPage,
          ...currentFilter,
        }).unwrap();

        if (response.data.length < 18) {
          setNewResponse(false);
        }

        if (currentPage === 1) {
          setProducts([...response.data]);
        } else {
          setProducts(prev => [...prev, ...response.data]);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    newResponse && currentFilter && fetchData();
  }, [getProducts, currentPage, currentFilter, newResponse]);

  const handleLoadMore = () => {
    if (hasMoreRef.current) {
      setPage(prevPage => prevPage + 1);
      dispatch(
        productListThunk({
          search,
          category: category.value,
          recomended: recomended.value,
          page: prevPage + 1,
        })
      );
    }
  };

  const handleInView = ([, inView, entry]) => {
    if (inView && hasMoreRef.current) {
      handleLoadMore();
    }
  };

  return (
    <div>
      {list.length === 0 ? (
        <ProductsNotFound />
      ) : (
        <ProductsListContainer ref={productListRef}>
          {list.map((product, index) => {
            const key = product._id;

            return (
              <ProductCard
                key={key}
                ref={index === products.length - 1 ? ref : null}
              >
                <ProductsItem
                  id={key}
                  weight={product.weight}
                  calories={product.calories}
                  category={product.category}
                  title={product.title}
                  isRecomended={
                    !product.groupBloodNotAllowed[bloodGroup] ? true : false
                  }
                />
                {index === list.length - 1 && (
                  <div ref={lastProductRef}>
                    {hasMoreRef.current && <p>Завантаження...</p>}
                    {!hasMoreRef.current && <p>Більше продуктів немає</p>}
                  </div>
                )}
              </ProductCard>
            );
          })}
          {useInView({ ref: lastProductRef, threshold: 0.5 }, handleInView)}
        </ProductsListContainer>
      )}
    </div>
  );
};
