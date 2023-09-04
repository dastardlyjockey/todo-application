import useSWR from "swr";
import fetcher from "@/lib/fetcher";

interface Todo {
  id: number;
  title: string;
  done: boolean;
  body: string;
}
const useTodos = () => {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);
  return { data, mutate };
};

export default useTodos;
