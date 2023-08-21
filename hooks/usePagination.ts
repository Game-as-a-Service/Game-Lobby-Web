import { useEffect, useState } from "react";
import { PageData } from "@/requests/rooms";
import axios, { AxiosError } from "axios";

const DEFAULT_PAGE = 1;

const usePagination = <T>(option: {
  source: (page: number, perPage: number) => Promise<PageData<T>>;
  defaultPerPage: number;
}) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState(option.defaultPerPage || 10);
  const [total, setTotal] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    async function query() {
      try {
        const res = await option.source(page, perPage);
        setTotal(res.page.total);
        setData(res.rooms);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setErrorMessage(err.message);
          setLoading(false);
          setIsError(true);
        }
      }
    }

    query();
  }, [page, perPage]);

  const setPerPageAndResetPage = (newPerPage: number) => {
    if (perPage + newPerPage <= 0) return;
    setPerPage((x) => x + newPerPage);
    setPage(DEFAULT_PAGE);
  };

  const nextPage = () => {
    if (total && page + 1 <= total / perPage) {
      setPage((x) => x + 1);
    }
  };

  const backPage = () => {
    if (page > 1) {
      setPage((x) => x - 1);
    }
  };

  return {
    data,
    total,
    page,
    backPage,
    nextPage,
    perPage,
    setPerPage: setPerPageAndResetPage,
    loading,
    isError,
    errorMessage,
  };
};

export default usePagination;
