package main

import (
	"fmt"
	"github.com/dastardlyjockey/go-react-todo/controller"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
)

func main() {
	fmt.Println("Hello, world!")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("Ok")
	})

	app.Post("/api/todos", controller.CreateTodo)
	app.Patch("/api/todos/:id/done", controller.UpdateTodo)
	app.Get("/api/todos", controller.GetTodos)

	log.Fatal(app.Listen(":4000"))
}
