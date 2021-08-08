const Router = require("koa-router");
const isEmpty = require("lodash/isEmpty");
const actorService = require("../../core/services/actorService");

class ActorsController extends Router {
  constructor() {
    super();

    super.get("/api/actors", this.getActors);
    super.get("/api/actors/:id", this.getActorById);
    super.post("/api/actors", this.createActor);
    super.delete("/api/actors/:id", this.deleteActor);
    super.put("/api/actors/:id", this.updateActor);
  }

  async createActor(parentContext) {
    if (isEmpty(parentContext.request.body)) {
      parentContext.throw(400, "body payload is required");
    }

    if (isEmpty(parentContext.request.body.name)) {
      parentContext.throw(400, "title is required");
    }

    try {
      parentContext.response.body = await actorService.createActor(
        parentContext.request.body
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async getActors(parentContext) {
    try {
      parentContext.response.body = await actorService.getActors(
        parentContext.query
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async getActorById(parentContext) {
    if (!parentContext.params || !parentContext.params.id) {
      parentContext.throw(400, "actor id is required");
    }

    try {
      parentContext.response.body = await actorService.getActorById(
        parentContext.params.id
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async deleteActor(parentContext) {
    if (!parentContext.params || !parentContext.params.id) {
      parentContext.throw(400, "Actor id is required");
    }

    try {
      await actorService.deleteActor(parentContext.params.id);
      parentContext.response.body = "Actor deleted!";
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async updateActor(parentContext) {
    if (!parentContext.params || !parentContext.params.id) {
      parentContext.throw(400, "Actor id is required");
    }

    if (!parentContext.request.body) {
      parentContext.throw(400, "request payload is required");
    }

    try {
      parentContext.response.body = await actorService.updateActor(
        parentContext.params.id,
        parentContext.request.body
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }
}

// expose as singleton
module.exports = new ActorsController();
