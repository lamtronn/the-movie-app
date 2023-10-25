import { MoviesType } from "@/types/dataTypes";
import MoviesItem from "@/components/MovieItem";
import _ from "lodash";
import { useEffect, useState } from "react";
import { MoviesResultType } from "@/types/apiTypes";

type MoviesListWrapperProps = {
  moviesList: MoviesResultType[] | MoviesType[];
};

const UpcomingMoviesListWrapper = ({ moviesList }: MoviesListWrapperProps) => {
  const [groupedByDateList, setGroupedByDateList] = useState<any>({});
  const [dateList, setDateList] = useState<string[]>([]);

  useEffect(() => {
    const newList = _.groupBy(moviesList, "release_date");
    setGroupedByDateList(newList);
    setDateList(Object.keys(newList));
  }, [moviesList]);

  return (
    <div className="flex flex-col gap-4">
      {dateList?.map((date: string) => {
        return (
          <div key={date}>
            <p className="text-sm mb-4">{date}</p>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
              {groupedByDateList[date].map(
                (movie: MoviesResultType | MoviesType) => (
                  <MoviesItem key={movie.id} data={movie} />
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingMoviesListWrapper;
