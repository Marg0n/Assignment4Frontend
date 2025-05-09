/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemsCard, { ItemData } from "@/components/shared/ItemsCard";
import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { setFilter } from "@/redux/features/filterSlice/filterSlice";
import { RootState } from "@/redux/store";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AllBicycleFilter from "./AllBicycleFilter";

const InfinityBicycle = () => {
  const dispatch = useDispatch();
  const [limit] = useState(9);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Infinite scroll state
  const [items, setItems] = useState<ItemData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isError } = useGetAllProductsQuery({
    page: currentPage,
    limit,
  });

  useEffect(() => {
    if (data?.data?.result?.length) {
      setItems((prev) => [...prev, ...data.data.result]);
      const totalPages = data.data.meta.totalPage;
      if (currentPage >= totalPages) setHasMore(false);
    }
  }, [data, currentPage]);

  useEffect(() => {
    if (isError) toast.error("Failed to load products");
  }, [isError]);

  // Intersection observer for infinite scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
    setIsFilterApplied(true);
  };

  const filters = useSelector((state: RootState) => state.filter);

  // Apply filters to `items`
  const filteredProducts = isFilterApplied
    ? items.filter((product: ItemData) => {
        const matchSearch =
          !filters.search ||
          product.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.brand?.toLowerCase().includes(filters.search.toLowerCase());

        const matchPrice =
          product.price &&
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];

        const matchType =
          !filters.type ||
          product.type?.toLowerCase() === filters.type.toLowerCase();

        const matchBrand =
          !filters.brand ||
          product.brand?.toLowerCase() === filters.brand.toLowerCase();

        const matchAvailability = filters.availability
          ? product.inStock === true
          : true;

        return (
          matchSearch &&
          matchPrice &&
          matchType &&
          matchBrand &&
          matchAvailability
        );
      })
    : items;

  const brands = Array.from(new Set(items.map((p) => p.brand).filter(Boolean)));
  const types = Array.from(new Set(items.map((p) => p.type).filter(Boolean)));

  return (
    <div className="w-full">
      {/* Filter Button on Mobile */}
      <div className="flex justify-end px-4 mt-4 lg:hidden">
        <Button icon={<MenuOutlined />} onClick={() => setFilterOpen(true)}>
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-4 mt-6">
        {/* Products */}
        <div className="lg:col-span-4 col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product: ItemData, index: number) => {
                const isLast = index === filteredProducts.length - 1;
                return (
                  <div
                    key={product._id}
                    ref={isLast ? lastItemRef : null}
                  >
                    <ItemsCard data={product} isPending={isFetching} />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center h-[60vh] text-gray-500 mt-10 flex justify-center items-center relative">
                <img
                  src="https://img.freepik.com/free-vector/abstract-empty-concrete-room-with-led-illumination_107791-18444.jpg?semt=ais_hybrid&w=740"
                  alt="No items"
                  className="object-cover w-full h-full"
                />
                <p className="absolute text-5xl text-red-600 shadow-2xl">
                  No bicycles found!
                </p>
              </div>
            )}
          </div>

          {/* Loading spinner at the bottom */}
          {isFetching && hasMore && (
            <div className="mt-4 text-center">
              <Loading />
            </div>
          )}
        </div>

        {/* Filter for large screens */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <AllBicycleFilter
            handleChange={handleFilterChange}
            brandOptions={brands as string[]}
            typeOptions={types as string[]}
          />
        </div>
      </div>

      {/* Drawer Filter for small screens */}
      <Drawer
        title="Filter"
        placement="left"
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
      >
        <AllBicycleFilter
          handleChange={handleFilterChange}
          brandOptions={brands as string[]}
          typeOptions={types as string[]}
        />
      </Drawer>
    </div>
  );
};

export default InfinityBicycle;