import { Box, List, ThemeIcon } from "@mantine/core";
import useTodos from "@/hooks/useTodos";
import AddTodo from "@/components/AddTodo";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import axios from "axios";
import { ENDPOINT } from "@/lib/fetcher";

export default function Home() {
  const { data, mutate } = useTodos();

  const markTodoAsDone = async (id: number) => {
    const update = await axios
      .patch(`${ENDPOINT}/api/todos/${id}/done`)
      .then((response) => response.data);

    await mutate(update);
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: "2rem",
          width: "100%",
          maxWidth: "40rem",
          margin: "0 auto",
        })}
      >
        <List spacing={"xs"} size={"sm"} mb={12} center>
          {data?.map((todo) => {
            return (
              <List.Item
                key={todo.id}
                onClick={() => markTodoAsDone(todo.id)}
                icon={
                  todo.done ? (
                    <ThemeIcon color={"teal"} size={24} radius={"xl"}>
                      <CheckCircleFillIcon size={20} />
                    </ThemeIcon>
                  ) : (
                    <ThemeIcon color={"gray"} size={24} radius={"xl"}>
                      <CheckCircleFillIcon size={20} />
                    </ThemeIcon>
                  )
                }
              >
                {todo.title}
              </List.Item>
            );
          })}
        </List>
        <AddTodo mutate={mutate} />
      </Box>
    </>
  );
}
