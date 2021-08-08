const Actor = require("../mongodb/models/Actor");
const filterBuilder = require("../utils/filterBuilder");

class ActorService {
  async createActor(payload) {
    const newActor = new Actor({
      name: payload.name,
      nickname: payload.nickname,
      imgPath: payload.imgPath,
      rating: payload.rating,
    });

    return await newActor.save();
  }

  async deleteActor(actorId) {
    await Actor.findByIdAndDelete(actorId);
  }

  async updateActor(actorId, payload) {
    return await Actor.findByIdAndUpdate(
      actorId,
      { $set: payload },
      { new: true }
    );
  }

  async getActors(searchCriteria) {
    const filters = filterBuilder.getFilter(searchCriteria);

    return await Actor.find(filters.get("query"))
      .skip(filters.get("skip"))
      .limit(filters.get("pageSize"))
      .sort(filters.get("sort"));
  }

  async getActorById(actorId) {
    return await Actor.findById(actorId);
  }
}

module.exports = new ActorService();
