package controller

import (
	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

var todos = []Todo{}

func CreateTodo(c *fiber.Ctx) error {
	todo := &Todo{}
	err := c.BodyParser(todo)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("error parsing the request")
	}

	todo.ID = len(todos) + 1
	todos = append(todos, *todo)

	return c.Status(fiber.StatusOK).JSON(todos)
}

func UpdateTodo(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("error retrieving the id from the url")
	}

	for i, todo := range todos {
		if todo.ID == id {
			todos[i].Done = true
			break
		}
	}

	return c.Status(fiber.StatusOK).JSON(todos)
}

func GetTodos(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(todos)
}
