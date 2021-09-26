import { createStore } from 'vuex';

export default createStore({
  state: {
    chosenServices: [],
    currentUser: {},
    checkIfCurrentUserObjectExists: false,
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
      
        // console.log(arrayOfServices);

        arrayOfServices.forEach(async service => {
          const xd = await fetch('http://localhost:3000/services/save-service', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(service)
          });

          console.log(xd.json());
        })
      } catch(err) {
        console.log(err);
      }
    }
  },
  modules: {
  }
})
