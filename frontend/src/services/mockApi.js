/**
 * Mock API Service für lokale UI-Entwicklung
 * Ersetzt echte API-Calls mit Dummy-Daten
 * Wird nur im Development-Modus verwendet
 */

// Simulated database (in-memory)
const mockDB = {
  children: [],
  dogs: [],
};

let childIdCounter = 1;
let dogIdCounter = 1;

export const mockApi = {
  // ========== CHILDREN ==========
  createChild: async (name, pin) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate
    if (!name || name.trim().length < 2) {
      throw {
        response: {
          status: 400,
          data: { message: 'Der Name muss mindestens 2 Zeichen lang sein!' }
        }
      };
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      throw {
        response: {
          status: 400,
          data: { message: 'PIN muss 4 Ziffern lang sein!' }
        }
      };
    }

    // Check for duplicate
    if (mockDB.children.find(c => c.name === name)) {
      throw {
        response: {
          status: 409,
          data: { message: 'Dieser Namen existiert bereits!' }
        }
      };
    }

    const child = {
      id: childIdCounter++,
      name: name.trim(),
      pin,
      createdAt: new Date().toISOString(),
    };

    mockDB.children.push(child);

    return {
      data: {
        success: true,
        child: {
          id: child.id,
          name: child.name,
          createdAt: child.createdAt,
        },
      },
    };
  },

  loginChild: async (name, pin) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const child = mockDB.children.find(c => c.name === name);

    if (!child || child.pin !== pin) {
      throw {
        response: {
          status: 401,
          data: { message: 'Name oder PIN falsch!' }
        }
      };
    }

    return {
      data: {
        success: true,
        child: {
          id: child.id,
          name: child.name,
          createdAt: child.createdAt,
        },
      },
    };
  },

  // ========== DOGS ==========
  createDog: async (childId, breed, dogName) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!dogName || dogName.trim().length < 2) {
      throw {
        response: {
          status: 400,
          data: { message: 'Der Hundenamen muss mindestens 2 Zeichen lang sein!' }
        }
      };
    }

    // Check if child already has a dog
    if (mockDB.dogs.find(d => d.child_id === childId)) {
      throw {
        response: {
          status: 409,
          data: { message: 'Du hast bereits einen Hund! Du kannst nur einen Hund pro Profil haben!' }
        }
      };
    }

    const dog = {
      id: dogIdCounter++,
      child_id: childId,
      dog_name: dogName.trim(),
      breed,
      level: 1,
      hunger: 50,
      happiness: 80,
      health: 100,
      visualState: 'baby',
      createdAt: new Date().toISOString(),
    };

    mockDB.dogs.push(dog);

    return {
      data: {
        success: true,
        dog,
      },
    };
  },

  getDog: async (dogId) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const dog = mockDB.dogs.find(d => d.id === parseInt(dogId));

    if (!dog) {
      throw {
        response: {
          status: 404,
          data: { message: 'Hund nicht gefunden!' }
        }
      };
    }

    return {
      data: {
        success: true,
        dog,
      },
    };
  },
};
