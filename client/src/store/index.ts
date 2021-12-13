import { createStore } from 'vuex';
import User from '../types/User';
import Service from '../types/Service';

export default createStore({
  state: {
    chosenServices: <Service[]>[],
    currentUser: <User>{},
    checkIfCurrentUserObjectExists: <boolean>false,
    fetchedUserVisits: null,
    hideFooterIfNavBurgerIsOpened: <boolean>true
  },

  mutations: {
    declareChosenServices(state, chosenServices) {
      state.chosenServices = chosenServices;
    },
    setCurrentUser(state, user: User) {
      state.currentUser = user;
    },
    setCheckIfCurrentUserObjectExists(state, bool: boolean) {
      state.checkIfCurrentUserObjectExists = bool;
    },
    fetchedUserVisits(state, visits) {
      state.fetchedUserVisits = visits;
    },
    hideShowFooterIfNavBurgerIsOpened(state, bool: boolean) {
      state.hideFooterIfNavBurgerIsOpened = bool
    }
  },

  actions: {
    async saveChosenServicesToDatabase(context) {
      try {
        const arrayOfServices = <any[]>[];
        const currentUser = JSON.parse(JSON.stringify(context.state.currentUser));

        context.state.chosenServices.forEach((service: Service) => {
          const objectWithInformationsAboutService = {
            userId: <string>currentUser._id,
            userName: <string>currentUser.fullName,
            phoneNumber: <number>currentUser.phoneNumber,
            serviceName: <string>service.name,
            typeOfService: <string>service.type,
            price: <number>service.price,
            dateOfAppointment: <Date>service.date,
            hourOfAppointment: <string>service.hourOfAppointment,
            employee: <string>service.employee
          }

          arrayOfServices.push(objectWithInformationsAboutService);
        });
        console.log(arrayOfServices);

        const saveToDatabase = await fetch('http://localhost:3000/services/save-service', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(arrayOfServices)
        });
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

        const visits = await userVisits.json();
        console.log(visits);
        
        context.commit('fetchedUserVisits', visits);
      } catch(err) {
        console.log(err);
      }
    }
  },

  modules: {
  }
})
