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
                    <div class="days" v-for="(day, index) in arrayOfDays" :key="index">
                        {{ day }}
                    </div>
                </div>
                <div class="date-container">
                    <div class="dates" v-for="(date, index) in arrayOfDates" :key="index" @click="service.date = date">
                        {{ date.getDate() }}
                    </div>
                </div>
                <div class="hours-container employee-choice" >
                    <select name="" id="" required v-model="service.hourOfAppointment">
                        <option value="" disabled selected >Choose an hour</option>
                        <option :value="hour" v-for="(hour, index) in arrayOfHours" :key="index">{{ hour }}</option>
                    </select>
                </div>
            </div>
        </div>
        {{ getDeclaredServiceFromStore }}
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import createStore from '../store/index';

export default defineComponent({
    setup() {
        let arrayOfDates = ref<Date[]>([]);
        const arrayOfDays = ref<string[]>(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
        const arrayOfHours = ref<string[]>(['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', 
        '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', ]);

        const getDeclaredServiceFromStore = computed(() => {
            return createStore.state.chosenServices;
        })
        
        onMounted(() => {
            let todaysDate = new Date();

            for(let i = 0; i < 7; i++) {
                if(arrayOfDates.value.length === 0) {
                    arrayOfDates.value.push(new Date(todaysDate));
                } else {
                    arrayOfDates.value.push(new Date(todaysDate.setDate(todaysDate.getDate() + 1)));
                }
            }
        })

        return {
            getDeclaredServiceFromStore,
            arrayOfDates,
            arrayOfDays,
            arrayOfHours
        }
    },
})
</script>

<style lang="scss" scoped>
$price-color: #6c757d;
$blue-border-color: #5aabe4;

@media (max-width: 320px) {
    .container {
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

                        &:hover {
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
    }
}
</style>