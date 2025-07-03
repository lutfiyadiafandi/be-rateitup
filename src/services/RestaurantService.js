const prisma = require("../../prisma/client");

class RestaurantService {
  // Create restaurant
  async createRestaurant(data, userId) {
    const { name, description, photoUrl, location, mapsUrl } = data;
    const restaurant = await prisma.restaurant.create({
      data: {
        name: name,
        description: description,
        photo_url: photoUrl,
        location: location,
        maps_url: mapsUrl,
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
    return restaurant;
  }

  // Find all restaurants
  async findAllRestaurants() {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        reviews: {
          select: {
            id: true,
            title: true,
            text: true,
            rating: true,
            created_at: true,
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return restaurants;
  }

  // Find restaurant by ID
  async findRestaurantById(restaurantId) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        id: true,
        name: true,
        description: true,
        photo_url: true,
        location: true,
        maps_url: true,
        created_at: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        reviews: {
          select: {
            id: true,
            title: true,
            text: true,
            rating: true,
            created_at: true,
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
            comments: {
              select: {
                id: true,
                text: true,
                created_at: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                  },
                },
              },
              orderBy: {
                created_at: "asc",
              },
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });
    return restaurant;
  }

  // Update restaurant
  async updateRestaurant(restaurantId, data, userId) {
    let restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) throw new Error("Restaurant not found");
    if (restaurant.user_id !== userId) throw new Error("Unauthorized");

    const updatedData = {};
    if (data.name) updatedData.name = data.name;
    if (data.description) updatedData.description = data.description;
    if (data.photoUrl) updatedData.photo_url = data.photoUrl;
    if (data.location) updatedData.location = data.location;
    if (data.mapsUrl) updatedData.maps_url = data.mapsUrl;

    restaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: updatedData,
    });
    return restaurant;
  }

  // Delete restaurant
  async deleteRestaurant(restaurantId, userId) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) throw new Error("Restaurant not found");
    if (restaurant.user_id !== userId) throw new Error("Unauthorized");

    await prisma.restaurant.delete({
      where: { id: restaurantId },
    });
    return true;
  }
}

module.exports = new RestaurantService();
