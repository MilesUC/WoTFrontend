import axios from 'axios';

const BASE_URL = "https://9hj7whyz40.execute-api.us-east-1.amazonaws.com/dev-wot-backend";


// Usuario
export async function signup(name, lastName, mail, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({
                name,
                lastName,
                mail,
                password,
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to sign up');
        }
        return response;

    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}

export async function login(mail, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({
                mail,
                password,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response;

    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}


// Users

export async function get_users(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }});
        console.log(response);
        return response;

    } catch (error) {
        console.error(error);
    }
}

// Obtener user en perfil, ya sea registrandose o con login
// Debe star protegida. No cualquier usuario debe tener acceso a los datos de un usuario
export async function get_profile(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/get_profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }});
        console.log(response);
        return response;

    } catch (error) {
        console.error(error);
    }
}

// Eliminar cuenta de user
export async function delete_user(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/delete_account`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }});
        console.log(response);
        return response;

    } catch (error) {
        console.error(error);
    }
}

export async function change_password(oldPassword, newPassword, newPasswordConfirmation, token) {
    try {
        const response = await fetch(`${BASE_URL}/users/change_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                oldPassword,
                newPassword,
                newPasswordConfirmation,
            }),
        });
        console.log(response);
        const data = await response.json();
        return response;

    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}

export async function patch_user(token, json){
    try{
        const response = await fetch(`${BASE_URL}/users/edit_profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(json),
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

//Comunidades

export async function get_communities(token) {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
  
      const response = await axios.get(`${BASE_URL}/communities/joinable_communities`, {
        headers: headers,
      });
      return response;
    } catch (error) {
      // Handle errors here
      console.error(error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  }


export async function get_community(token, community_id) {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
  
      const response = await axios.get(`${BASE_URL}/communities/${community_id}`, {
        headers: headers,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


export async function get_user_communities(token) {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
  
      const response = await axios.get(`${BASE_URL}/communities/memberships`, {
        headers: headers,
      });
      console.log(response);
      return response;
    } catch (error) {
      // Handle errors here
      console.error(error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  }

export async function create_community(name, description, token) {
    try {
        const response = await fetch(`${BASE_URL}/communities/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to create community');
        }
        const data = await response.json();
        console.log(data);
        return response;

    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}

export async function edit_community(token, community_id, name, description) {
    console.log(community_id);
    console.log(name);
    console.log(description);
    try {
        const response = await fetch(`${BASE_URL}/communities/${community_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to create community');
        }
        const data = await response.json();
        console.log(data);
        return response;

    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}

export async function delete_community(token, community_id) {
    try {
      const response = await fetch(`${BASE_URL}/communities/${community_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log(response);
  
      if (!response.ok) {
        throw new Error('Failed to delete community');
      }
      return response;
    } catch (error) {
      // Handle errors here
      console.error(error);
      throw error; // Rethrow the error to propagate it to the calling function
    }
  }

  export async function join_community(token, communityId) {
    console.log(communityId);
    try {
        const response = await fetch(`${BASE_URL}/communities/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                communityId,
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to join community');
        }
        const data = await response.json();
        console.log(data);
        return response;

    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}

export async function leave_community(token, communityId) {
    try {
        const response = await fetch(`${BASE_URL}/communities/leave/${communityId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to leave community');
        }
        return response;

    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}


// Listas datos


//router.get('/disponibilidades', controller.getDisponibilidades);
export async function get_disponibilidades() {
    try {
      const response = await axios.get(`${BASE_URL}/obtener_listas/disponibilidades`);
      console.log(response);
      return response;
    } catch (error) {
      // Handle errors here
      console.error(error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  }

//router.get('/jornadas', controller.getJornadas);
export async function get_jornadas() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/jornadas`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/modalidades', controller.getModalidades);

export async function get_modalidades() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/modalidades`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/areas', controller.getAreas);
export async function get_areas() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/areas`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/regiones', controller.getRegiones);
export async function get_regiones() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/regiones`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/profesiones', controller.getProfesiones);
export async function get_profesiones() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/profesiones`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/industrias', controller.getIndustrias);
export async function get_industrias() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/industrias`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/competencias', controller.getCompetencias);
export async function get_competencias() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/competencias`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/idiomas', controller.getIdiomas);
export async function get_idiomas() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/idiomas`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/formularios', controller.getFormularios);
export async function get_formularios() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/formularios`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/rangoAnos', controller.getRangoAnos);
export async function get_rango_anos() {
    try {
        const response = await axios.get(`${BASE_URL}/obtenerListas/rango_anos`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/paises', controller.getPaises);
export async function get_paises() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/paises`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/universidades', controller.getUniversidades);
export async function get_universidades() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/universidades`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/cargos', controller.getCargos);
export async function get_cargos() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/cargos`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/aniosExperiencia', controller.getAniosExperiencia);
export async function get_anos_experiencia() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/anios_experiencia`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/conocioWot', controller.getConocioWot);
export async function get_conocio_wot() {
    try {
        const response = await axios.get(`${BASE_URL}/obtener_listas/conocio_wot`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/anosFundacion', controller.getAnosFundacion);
export async function get_anos_fundacion() {
    try {
        const response = await axios.get(`${BASE_URL}/obtenerListas/anos_fundacion`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/ingresosAnuales', controller.getIngresosAnuales);
export async function get_ingresos_anuales() {
    try {
        const response = await axios.get(`${BASE_URL}/obtenerListas/ingresos_anuales`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

//router.get('/cantidadEmpleados', controller.getCantidadEmpleados);
export async function get_cantidad_empleados() {
    try {
        const response = await axios.get(`${BASE_URL}/obtenerListas/cantidad_empleados`);
        console.log(response);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}