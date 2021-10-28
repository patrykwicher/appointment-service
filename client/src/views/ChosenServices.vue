<template>
    <div class="container">
        <div class="card" v-for="(service, index) in getDeclaredServiceFromStore" :key="index">
            <div class="first-row">
                <div class="service-name">
                    {{ service.name }}
                </div>
                <div class="service-price">
                    {{ service.price }} zł
                </div>
            </div>
            <div class="second-row">
                <div class="employee-choice">
                    <select name="" id="" required v-model="service.employee">
                        <option value="" disabled selected>Choose an employee</option>
                        <option value="Kevin">Kevin</option>
                        <option value="Karen">Karen</option>
                    </select>
                </div>
                <div class="date-container">
                    <div class="days" v-for="(date, datesIndex) in arrayOfDates" :key="datesIndex">
                        {{ arrayOfDays[date.getDay()]}}
                    </div>
                </div>
                <div class="date-container">
                    <div class="dates" v-for="(date, index) in arrayOfDates" :key="index" @click="service.date = date">
                        {{ date.getDate() }}
                    </div>
                </div>
                <div class="hours-container employee-choice">
                    <select name="" id="" required v-model="service.hourOfAppointment" v-if="service.date">
                        <option value="" disabled selected >Choose an hour</option>
                        <option :value="hour" v-for="(hour, index) in arrayOfHours" :key="index">{{ hour }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="button">
            <router-link :to="{ name: 'UserVisits', params: { id: currentUser._id }}">
                    <LoginButton text="SAVE" @click="saveChosenServicesToDatabase" />
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount } from 'vue'
import createStore from '../store/index';
import LoginButton from '../components/LoginButton.vue';
import router from '../router/index';

export default defineComponent({
    setup() {
        let arrayOfDates = ref<Date[]>([]);
        const arrayOfDays = ref<string[]>(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        const arrayOfHours = ref<string[]>(['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', 
        '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', ]);

        const getDeclaredServiceFromStore = computed(() => {
            return createStore.state.chosenServices;
        })

        const currentUser = computed(() => {
            return createStore.state.currentUser;
        })

        const getUserVisits = () => {
            createStore.dispatch("fetchSavedUserServices");
        };

        const saveChosenServicesToDatabase = () => {
            createStore.dispatch('saveChosenServicesToDatabase')
            getUserVisits();
        }

        onBeforeMount(() => {
            let todaysDate = new Date();

            for(let i = 0; i < 7; i++) {
                if(arrayOfDates.value.length === 0) {
                    arrayOfDates.value.push(new Date(todaysDate));
                } else {
                    arrayOfDates.value.push(new Date(todaysDate.setDate(todaysDate.getDate() + 1)));
                }
            }
        });

        return {
            getDeclaredServiceFromStore,
            arrayOfDates,
            arrayOfDays,
            arrayOfHours,
            currentUser,
            saveChosenServicesToDatabase
        }
    },
    components: {
        LoginButton
    }
})
</script>

<style lang="scss" scoped>
$price-color: #6c757d;
$blue-border-color: #5aabe4;

@media (max-width: 320px) {
    .container {
        padding-bottom: 2rem;
        
        .card {
            margin: 10% 9%;
            box-shadow: 0px 3px 9px -2px rgba(0,0,0,0.30);

            .first-row {
                display: flex;
                justify-content: space-between;
                font-size: 0.9rem;

                .service-name {
                    width: 55%;
                    margin: 1rem 1rem;
                }

                .service-price {
                    margin: 1rem 1rem;
                    color: $price-color;
                }
            }

            .second-row {
                .employee-choice {
                    text-align: center;
                    margin: 0 1rem;

                    select {
                        width: 100%;
                        margin: 0 0 1rem 0;
                        border: 1px solid rgb(168, 168, 168);
                        border-radius: 50px;
                        text-align: center;
                        cursor: pointer;
                        font-size: 1rem;
                        height: 2rem;
                    }
                }

                .date-container {
                    display: flex;
                    justify-content: space-around;
                    font-size: 0.9rem;

                    .days, .dates {
                        text-align: center;
                        width: 100%;
                    }

                    .days {
                        margin-bottom: .6rem;
                        width: 1.8rem;
                    }

                    .dates {
                        border: 1px solid $blue-border-color;
                        border-radius: 5px;
                        width: 1.7rem;
                        font-weight: 700;
                        margin-bottom: 0.6rem;
                        color: $blue-border-color;
                        cursor: pointer;

                        &:hover, &:active, &:focus {
                            background-color: $blue-border-color;
                            color: white;
                        }
                    }
                }

                .hours-container {
                    select {
                        margin: 0.5rem 0 1rem 0;
                    }
                }
            }
        }

        .button {
            margin: 0 9%;

            .login-button {
                width: 100%;
            }
        }
    }
}

@media (min-width: 321px) {
    .container {
        padding-bottom: 2rem;
        
        .card {
            box-sizing: border-box;
            margin: 10% 9%;
            box-shadow: 0px 3px 9px -2px rgba(0,0,0,0.30);

            .first-row {
                display: flex;
                justify-content: space-between;
                font-size: 0.9rem;

                .service-name {
                    width: 55%;
                    margin: 1rem 1rem;
                }

                .service-price {
                    margin: 1rem 1rem;
                    color: $price-color;
                }
            }

            .second-row {
                .employee-choice {
                    text-align: center;
                    margin: 0 1rem;

                    select {
                        width: 100%;
                        margin: 0 0 1rem 0;
                        border: 1px solid rgb(168, 168, 168);
                        border-radius: 50px;
                        text-align: center;
                        cursor: pointer;
                        font-size: 1rem;
                        height: 2rem;
                    }
                }

                .date-container {
                    display: flex;
                    justify-content: space-around;
                    font-size: 0.9rem;

                    .days, .dates {
                        text-align: center;
                        width: 100%;
                    }

                    .days {
                        margin-bottom: .6rem;
                        width: 1.8rem;
                    }

                    .dates {
                        display: flex;
                        border: 1px solid $blue-border-color;
                        border-radius: 5px;
                        width: 1.7rem;
                        height: 1.7rem;
                        align-items: center;
                        justify-content: center;
                        font-weight: 700;
                        margin-bottom: 0.6rem;
                        color: $blue-border-color;
                        cursor: pointer;

                        &:hover, &:active, &:focus {
                            background-color: $blue-border-color;
                            color: white;
                        }
                    }
                }

                .hours-container {
                    select {
                        margin: 0.5rem 0 1rem 0;
                    }
                }
            }
        }

        .button {
            margin: 0 9%;

            .login-button {
                width: 100%;
            }
        }
    }
}

@media (min-width: 375px) {
    .container {
        .card {
            .first-row {
                display: flex;
                justify-content: space-between;
                font-size: 0.95rem;

                .service-name {
                    width: 55%;
                    margin: 1rem 1rem;
                }

                .service-price {
                    margin: 1rem 1rem;
                    color: $price-color;
                }
            }

            .second-row {
                .employee-choice {
                    select {
                        width: 80%;
                    }
                }

                .date-container {
                    width: 90%;
                    margin: 0 auto;

                    .dates {
                        width: 1.9rem;
                        height: 1.9rem;
                        font-size: 0.9rem;
                    }
                }
            }
        }

        .button {
            .login-button {
                font-size: 1rem;
            }
        }
    }
}

@media (min-width: 428px) {
    .container {
        .card {
            padding: 0 4%;
            
            .first-row {
                font-size: 1rem;
            }

            .second-row {
                .date-container {
                    font-size: 0.95rem;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .container {
        min-height: 55vh;

        .card {
            box-shadow: 0px 3px 9px 0 rgba(0,0,0,0.30);
            margin: 7% auto 5%;
            width: 25rem;
            padding: 3% 3%;

            .first-row {
                font-size: 1.1rem;
                font-weight: 500;
            }

            .second-row {
                .employee-choice {
                    margin: 3% 0;

                    select {
                        width: 60%;
                    }
                }

                .date-container {
                    font-weight: 600;
                    font-size: 0.95rem;
                    justify-content: space-around;
                    width: 100%;

                    .dates {
                        width: 2.1rem;
                        height: 2.1rem;
                    }
                }

                .hours-container {
                    select {
                        margin: 3% 0;
                    }
                }
            }
        }

        .button {
            text-align: center;

            .login-button {
                width: 25rem;
                font-size: 1.2rem;
            }
        }
    }
}

@media (min-width: 1024px) {
    .container {
        min-height: 63vh;
    }
}

@media (min-width: 1280px) {
    .container {
        .card {
            margin: 5% auto;
        }
    }
}

@media (min-width: 1440px) {
    .container {
        .card {
            margin: 5% auto;
            width: 30rem;

            .first-row {
                font-size: 1.2rem;
            }

            .second-row {
                font-size: 1.2rem;
                
                .employee-choice {
                    select {
                        font-size: 1rem;
                        height: 40px;
                    }
                }

                .date-container {

                    .days {
                        width: 100%;
                        text-align: center;
                        font-size: 1.1rem;
                    }

                    .dates {
                        width: 2.7rem;
                        height: 2.7rem;
                        font-size: 1.1rem;
                    }
                }
            }
        }
        
        .button {
            .login-button {
                width: 30rem;
                font-size: 1.2rem;
            }
        }
    }
}
</style>