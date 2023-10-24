type PaginationProps = {
  page: number;
  onClickPreviousPage: () => void;
  onClickNextPage: () => void;
};

const Pagination = ({
  page,
  onClickPreviousPage,
  onClickNextPage,
}: PaginationProps) => {
  return (
    <div className="flex justify-between w-full">
      {page !== 1 ? (
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={onClickPreviousPage}
        >
          Page {page - 1}
        </button>
      ) : (
        <div />
      )}
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={onClickNextPage}
      >
        Page {page + 1}
      </button>
    </div>
  );
};

export default Pagination;
