import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsItem } from '../ProductsItem/ProductsItem';
import { selectUser } from '../../../redux/auth/selectors';
import { infiniteScrollThunk, productListThunk } from '../../../redux/products/operations';
import { selectCategoryFilter, selectProductsList, selectRecomendedFilter, selectSearchFilter } from '../../../redux/products/selectors';
import { ProductsListContainer, ProductsListItem } from './ProductsList.styled';
import ProductsNotFound from '../ProductsNotFound/ProductsNotFound';

export const ProductsList = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectProductsList);
  const bloodGroup = useSelector(selectUser).blood;
  const search = useSelector(selectSearchFilter);
  const category = useSelector(selectCategoryFilter);
  const recomended = useSelector(selectRecomendedFilter);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          recomended: recomended.value,
          category: category.value,
          search,
          page,
          limit: 24,
        };

        const data = await dispatch(productListThunk(params));

        if (data.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching product list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, recomended, category, search, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          recomended: recomended.value,
          category: category.value,
          search,
          page,
          limit: 24,
        };

        const data = await dispatch(infiniteScrollThunk(params));

        if (data.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching more products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1 && !loading && hasMore) {
      fetchData();
    }
  }, [dispatch, recomended, category, search, page, loading, hasMore]);

  return (
    <div>
      {list.length === 0 ? (
        <ProductsNotFound />
      ) : (
        <ProductsListContainer>
          {list.map(({ _id, weight, calories, category, title, groupBloodNotAllowed }) => (
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
          ))}
        </ProductsListContainer>
      )}
    </div>
  );
};
