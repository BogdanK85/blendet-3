// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ProductsItem } from '../ProductsItem/ProductsItem';
// import { selectUser } from '../../../redux/auth/selectors';
// import { productListThunk } from '../../../redux/products/operations';
// import { selectFilter, selectProductsList } from '../../../redux/products/selectors';
// import { ProductsListContainer, ProductsListItem } from './ProductsList.styled';
// import ProductsNotFound from '../ProductsNotFound/ProductsNotFound';

// export const ProductsList = () => {
//   const dispatch = useDispatch();

//   const list = useSelector(selectProductsList);
//   const bloodGroup = useSelector(selectUser).blood;
//   const filter = useSelector(selectFilter);
//   const { search, category, recomended } = filter;

//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(
//       productListThunk({
//         recomended: recomended.value,
//         category: category.value,
//         search,
//         page,
//       })
//     );
//   }, [dispatch, recomended, category, search, page]);

//   const handleScroll = () => {
//     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div>
//       {list.length === 0 ? (
//         <ProductsNotFound />
//       ) : (
//         <ProductsListContainer>
//           {list.map(({ _id, weight, calories, category, title, groupBloodNotAllowed }) => {
//             return (
//               <ProductsListItem key={_id}>
//                 <ProductsItem
//                   id={_id}
//                   weight={weight}
//                   calories={calories}
//                   category={category}
//                   title={title}
//                   isRecomended={!groupBloodNotAllowed[bloodGroup]}
//                 />
//               </ProductsListItem>
//             );
//           })}
//         </ProductsListContainer>
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsItem } from '../ProductsItem/ProductsItem';
import { selectUser } from '../../../redux/auth/selectors';
import { productListThunk } from '../../../redux/products/operations';
import {
  selectFilter,
  selectProductsList,
} from '../../../redux/products/selectors';
import { ProductsListContainer, ProductsListItem } from './ProductsList.styled';
import ProductsNotFound from '../ProductsNotFound/ProductsNotFound';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ProductsList = () => {
  const dispatch = useDispatch();

  const list = useSelector(selectProductsList);
  const bloodGroup = useSelector(selectUser).blood;
  const filter = useSelector(selectFilter);
  const { search, category, recomended } = filter;

  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    dispatch(
      productListThunk({
        recomended: recomended.value,
        category: category.value,
        search,
        page,
      })
    );
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    dispatch(
      productListThunk({
        recomended: recomended.value,
        category: category.value,
        search,
        page,
      })
    );
  }, [dispatch, recomended, category, search, page]);

  return (
    <div>
      {list.length === 0 ? (
        <ProductsNotFound />
      ) : (
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more products</p>}
        >
          <ProductsListContainer>
            {list.map(
              ({
                _id,
                weight,
                calories,
                category,
                title,
                groupBloodNotAllowed,
              }) => (
                <ProductsListItem key={_id}>
                  <ProductsItem
                    id={_id}
                    weight={weight}
                    calories={calories}
                    category={category}
                    title={title}
                    isRecomended={!groupBloodNotAllowed[bloodGroup]}
                  />
                </ProductsListItem>
              )
            )}
          </ProductsListContainer>
        </InfiniteScroll>
      )}
    </div>
  );
};

//===============================================
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ProductsItem } from '../ProductsItem/ProductsItem';
// import { selectUser } from '../../../redux/auth/selectors';
// import { productListThunk } from '../../../redux/products/operations';
// import { selectFilter, selectProductsList } from '../../../redux/products/selectors';
// import { ProductsListContainer, ProductsListItem } from './ProductsList.styled';
// import ProductsNotFound from '../ProductsNotFound/ProductsNotFound';
// import InfiniteScroll from 'react-infinite-scroll-component';

// export const ProductsList = () => {
//   const dispatch = useDispatch();

//   const list = useSelector(selectProductsList);
//   const bloodGroup = useSelector(selectUser).blood;
//   const filter = useSelector(selectFilter);
//   const { search, category, recomended } = filter;

//   const [page, setPage] = useState(1);

//   const fetchMoreData = () => {
//     dispatch(
//       productListThunk({
//         recomended: recomended.value,
//         category: category.value,
//         search,
//         page,
//       })
//     );
//     setPage((prevPage) => prevPage + 1);
//   };

//   useEffect(() => {
//     dispatch(
//       productListThunk({
//         recomended: recomended.value,
//         category: category.value,
//         search,
//         page,
//       })
//     );
//   }, [dispatch, recomended, category, search, page]);

//   return (
//     <div>
//       {list.length === 0 ? (
//         <ProductsNotFound />
//       ) : (
//         <InfiniteScroll
//           dataLength={list.length}
//           next={fetchMoreData}
//           hasMore={true}
//           loader={<h4>Loading...</h4>}
//           endMessage={<p>No more products</p>}
//         >
//           <ProductsListContainer>
//             {list.map(({ _id, weight, calories, category, title, groupBloodNotAllowed }) => (
//               <ProductsListItem key={_id}>
//                 <ProductsItem
//                   id={_id}
//                   weight={weight}
//                   calories={calories}
//                   category={category}
//                   title={title}
//                   isRecomended={!groupBloodNotAllowed[bloodGroup]}
//                 />
//               </ProductsListItem>
//             ))}
//           </ProductsListContainer>
//         </InfiniteScroll>
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsItem } from '../ProductsItem/ProductsItem';
import { productListThunk } from '../../../redux/products/operations';
import {
  selectFilter,
  selectProductsList,
} from '../../../redux/products/selectors';
import { ProductsListContainer } from './ProductsList.styled';
import ProductsNotFound from '../ProductsNotFound/ProductsNotFound';

export const ProductsList = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectProductsList);
  const bloodGroup = useSelector(selectUserBlood);
  const filter = useSelector(selectFilter);
  const { search, category, recomended } = filter;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadMoreProducts = () => {
    if (loading) return;
    setLoading(true);
    dispatch(
      productListThunk({
        recomended: recomended.value,
        category: category.value,
        search,
        page: currentPage + 1,
      })
    );
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    dispatch(
      productListThunk({
        search,
        category: category.value,
        recomended: recomended.value,
      })
    );
  }, [dispatch, recomended, category, search]);

  return (
    <div>
      {list.length === 0 ? (
        <ProductsNotFound />
      ) : (
        <ProductsListContainer>
          {list.map(
            ({
              _id,
              weight,
              calories,
              category,
              title,
              groupBloodNotAllowed,
            }) => {
              return (
                <ProductsListItem key={_id}>
                  <ProductsItem
                    id={_id}
                    weight={weight}
                    calories={calories}
                    category={category}
                    title={title}
                    isRecomended={!groupBloodNotAllowed[bloodGroup]}
                  />
                </ProductsListItem>
              );
            }
          )}
        </ProductsListContainer>
      )}
    </div>
  );
};
