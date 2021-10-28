import { createStore } from 'vuex';
import User from '../types/User';

export default createStore({
  state: {
    chosenServices: [],
    currentUser: {} as User,
    checkIfCurrentUserObjectExists: false,
    fetchedUserVisits: null,
    hideFooterIfNavBurgerIsOpened: true
  },

  mutations: {
    declareChosenServices(state, chosenServices) {
      state.chosenServices = chosenServices;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setCheckIfCurrentUserObjectExists(state, bool) {
      state.checkIfCurrentUserObjectExists = bool;
    },
    fetchedUserVisits(state, visits) {
      state.fetchedUserVisits = visits;
    },
    hideShowFooterIfNavBurgerIsOpened(state, bool) {
      state.hideFooterIfNavBurgerIsOpened = bool
    }
  },

  actions: {
    saveChosenServicesToDatabase(context) {
      try {
        const arrayOfServices = <any[]>[];
        const currentUser = JSON.parse(JSON.stringify(context.state.currentUser));

        context.state.chosenServices.forEach((service: any) => {
          const objectWithInformationsAboutService = {
            userId: currentUser._id,
            userName: currentUser.fullName,
            phoneNumber: currentUser.phoneNumber,
            serviceName: service.name,
            typeOfService: service.type,
            price: service.price,
            dateOfAppointment: service.date,
            hourOfAppointment: service.hourOfAppointment,
            employee: service.employee
          }

          arrayOfServices.push(objectWithInformationsAboutService);
        });

        // arrayOfServices.forEach(async service => {
        //   const userService = await fetch('http://localhost:3000/services/save-service', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(service)
        //   });
        // })
        const xd = async () => {
          const userService = await fetch('http://localhost:3000/services/save-service', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(arrayOfServices)
          });
        }

        xd();
      } catch(err) {
        console.log(err);
      }
    },
    
    async fetchSavedUserServices(context) {
      try {
        const currentUser = await JSON.parse(JSON.stringify(context.state.currentUser));

        const userVisits = await fetch('http://localhost:3000/services/fetch-user-visits', {
          method: 'POST',
          headers: {
            'COntent-Type': 'application/json'
          },
          body: JSON.stringify(currentUser)
        });

        const visits = await userVisits.json()
        
        context.commit('fetchedUserVisits', visits);
      } catch(err) {
        console.log(err);
      }
    }
  },

  modules: {
  }
})
