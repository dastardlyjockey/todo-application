import React, { useState } from "react";
import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { ENDPOINT } from "@/lib/fetcher";
import { KeyedMutator } from "swr";

interface Todo {
  id: number;
  title: string;
  done: boolean;
  body: string;
}
const AddTodo = ({ mutate }: { mutate: KeyedMutator<Todo[]> }) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  const createTodo = async (values: { title: string; body: string }) => {
    const update = await axios
      .post(`${ENDPOINT}/api/todos`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);
    await mutate(update);
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title={"Create Todo"}>
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label={"Title"}
            placeholder={"What do you want to do?"}
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label={"Body"}
            placeholder={"Tell me more..."}
            {...form.getInputProps("body")}
          />
          <Button type={"submit"}>Create Todo</Button>
        </form>
      </Modal>
      <Group position={"center"}>
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Add Todo
        </Button>
      </Group>
    </>
  );
};

export default AddTodo;
