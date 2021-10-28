<template>
    <div class="main-container">
        <div class="container">
            <div class="burger-container" v-if="windowWidth < 1024">
                <img src="../assets/images/burger-icon.png" alt="burger" class="burger" @click="openCloseBurgerMenu">
            </div>
            <div class="logo">
                <router-link to="/">
                    <img src="../assets/images/FP_logo.jpg" alt="logo" class="logo" @click="getCurrentLink">
                </router-link>
            </div>
            <div class="login-container" v-if="windowWidth >= 1024">
                <div class="login" v-if="!getCurrentUserFromStore.fullName">
                    <router-link to="/login">
                        <LoginButton text="LOG IN" />
                    </router-link>
                </div>
                <div class='user' v-else>
                    <router-link class="user-router" :to="{ name:'UserVisits', params: { id: getCurrentUserFromStore._id }}">
                        {{ userFirstName }}
                    </router-link>
                    <div class="logout-container" @click="logout">Logout</div>
                </div>
            </div>
            <div id="shadow"></div>
            <div id="opened-burger-menu">
                <div class="icon-container">
                    <img src="../assets/images/close-icon.png" alt="close" id="close" @click="closeIcon">
                </div>
                <div v-if="!checkIfCurrentUserObjectExists">
                    <router-link to="/login" class="login-button">
                        <LoginButton text="LOG IN" @click="openCloseBurgerMenu"/>
                    </router-link>
                </div>
                <div class="current-user" v-else>
                    <router-link :to="{ name: 'UserVisits', params: { id: getCurrentUserFromStore._id }}" class="options" @click="closeIcon" >
                        <div class="option first-option">MY VISITS<img src="../assets/images/arrow-right.png" alt="right arrow"></div>
                    </router-link>
                    <router-link to="/" class="options" @click="closeIcon">
                        <div class="option">MY ACCOUNT <img src="../assets/images/arrow-right.png" alt="right arrow"></div>
                    </router-link>
                    <router-link to='/login' class="options" @click="closeIcon">
                        <div class="option" @click="logout">LOGOUT <img src="../assets/images/arrow-right.png" alt="right arrow"></div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="navbar" id="navbar">
            <router-link to="/" class='options-router'>
                <div class="navbar-options first-option">SERVICES</div>
            </router-link>
            <router-link to="/" class='options-router'>
                <div class="navbar-options">ABOUT</div>
                </router-link>
            <router-link to="/" class='options-router'>
                <div class="navbar-options">OPINIONS</div>
            </router-link>
            <router-link to="/" class='options-router'>
                <div class="navbar-options">TEAM</div>
            </router-link>
        </div>       
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import LoginButton from './LoginButton.vue';
import createStore from '../store/index';
import User from '../types/User';

export default defineComponent ({
    components: {
        LoginButton,
    },
    setup() {
        const windowWidth = window.innerWidth;

        const openCloseBurgerMenu = () => {
            const burgerMenu = document.getElementById('opened-burger-menu')!;
            const shadow = document.getElementById('shadow')!;

            if(burgerMenu.style.display === 'none') {
                burgerMenu.style.display = 'block';
                shadow.style.display = 'block';
                hideShowFooter(false);
            }
            else {
                burgerMenu.style.display = 'none';
                shadow.style.display = 'none';
                hideShowFooter(true);
            }
        }

        const hideShowFooter = (bool: boolean) => {
            createStore.commit('hideShowFooterIfNavBurgerIsOpened', bool);
        }

        const closeIcon = () => {
            const closeIcon = document.getElementById('close')!;
            const burgerMenu = document.getElementById('opened-burger-menu')!;
            const shadow = document.getElementById('shadow')!;

            burgerMenu.style.display = 'none';
            shadow.style.display = 'none';
            hideShowFooter(true);
        }

        const logout = async () => {
            createStore.commit('setCheckIfCurrentUserObjectExists', false);
            createStore.commit('setCurrentUser', {});

            try {
                const logout = await fetch('http://localhost:3000/clients/logout');
                const log = await logout.json();
                console.log(logout, log);
            } catch(e) {
                console.log(e);
            }
        }

        const getCurrentUserFromStore = computed(() => {
            return createStore.state.currentUser;
        })

        const checkIfCurrentUserObjectExists = computed(() => {
            return createStore.state.checkIfCurrentUserObjectExists;
        })

        const userFirstName = computed(() => {
            const user: User = createStore.state.currentUser;
            const fullName = user.fullName.split(' ');
            return fullName[0];
        })
    
        return {
            windowWidth,
            openCloseBurgerMenu,
            closeIcon,
            getCurrentUserFromStore,
            checkIfCurrentUserObjectExists,
            logout,
            userFirstName
        }
    }
})
</script>

<style lang='scss' scoped>
$login-color: #5aabe4;
$navbar-background: #F6F6F6;
$hover-option: #FBFBFB;
$shadow-color: #acacac;

@media (max-width: 320px) {
    .main-container {
        .container {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .burger-container {
                img {
                    width: 2rem;
                    color: #4F5358;
                    cursor: pointer;
                }
            }

            .logo {
                width: 80%;
                text-align: center;

                img {
                    width: 85%;
                    cursor: pointer;
                }   
            }

            #shadow {
                display: none;
                z-index: 2;
                position: absolute;
                width: 100%;
                height: 95vh;
                top: 100%;
                left: 0;
                background-color: black;
                opacity: 0.6;
            }

            #opened-burger-menu {
                display: none;
                z-index: 3;
                position: absolute;
                width: 90%;
                height: 95vh;
                top: 100%;
                left: 0;
                background-color: $navbar-background;
                text-align: center;

                .icon-container {
                    margin: 1rem 1rem 0 0;
                    text-align: right;

                    img {
                        width: 2rem;
                        cursor: pointer;
                    }
                }   

                .login-button {
                    width: 90%;
                    text-align: center;
                    margin: 0.6rem auto;
                }

                .current-user {
                    margin-top: 1rem;

                    .first-option { 
                        border-top: 1px solid $shadow-color;
                    }

                    .options {
                        text-decoration: none;
                        cursor: pointer;
                        text-align: left;

                        .option {
                            display: flex;
                            justify-content: space-between;
                            padding: 5% 10%;
                            font-size: 0.9rem;
                            color: black;
                            align-items: center;
                            border-bottom: 1px solid $shadow-color;

                            &:hover {
                                background-color: $shadow-color;
                            }

                            img {
                                width: 0.9rem;
                            }
                        }
                    }
                }
            }
        }

        .navbar {
            display: flex;
            background-color: $navbar-background;
            font-size: 0.8rem;
            justify-content: space-around;

            .options-router {
                text-decoration: none;
                color: black;
                width: 100%;
                text-align: center;
                
                .navbar-options {
                    cursor: pointer;
                    padding: 1rem 0;
                    transition: ease-in .15s;

                    &:hover, &:focus {
                        background-color: $hover-option;
                    }
                }
            }
        }
    }
}

@media (min-width: 321px) {
    .main-container {
        .container {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .burger-container {
                img {
                    width: 2rem;
                    color: #4F5358;
                    cursor: pointer;
                }
            }

            .logo {
                width: 80%;
                text-align: center;

                img {
                    width: 90%;
                    cursor: pointer;
                }   
            }

            #shadow {
                display: none;
                z-index: 2;
                position: absolute;
                width: 100%;
                height: 88vh;
                top: 100%;
                left: 0;
                background-color: black;
                opacity: 0.7;
            }

            #opened-burger-menu {
                display: none;
                z-index: 3;
                position: absolute;
                width: 85%;
                height: 88vh;
                top: 100%;
                left: 0;
                background-color: $navbar-background;
                text-align: center;

                .icon-container {
                    margin: 1rem 1rem 0 0;
                    text-align: right;

                    img {
                        width: 2rem;
                        cursor: pointer;
                    }
                }

                .login {
                    cursor: pointer;
                    border: 1px solid $login-color;
                    font-weight: 700;
                    color: $login-color;
                    border-radius: 50px;
                    padding: 0.7rem 1.375rem;
                    transition: ease-in .2s;
                    width: 70%;
                    text-align: center;
                    margin: 1rem auto 0;
                    background-color: white;

                    &:hover {
                        background-color: $login-color;
                        color: white;
                    }
                }
                .login-button {
                    width: 90%;
                    text-align: center;
                    margin: 0.8rem 0;
                }

                .current-user {
                    margin-top: 1rem;

                    .first-option { 
                        border-top: 1px solid $shadow-color;
                    }

                    .options {
                        text-decoration: none;
                        cursor: pointer;
                        text-align: left;

                        .option {
                            display: flex;
                            justify-content: space-between;
                            padding: 5% 10%;
                            font-size: 0.9rem;
                            color: black;
                            align-items: center;
                            border-bottom: 1px solid $shadow-color;

                            &:hover {
                                background-color: $shadow-color;
                            }

                            img {
                                width: 0.9rem;
                            }
                        }
                    }
                }
            }
        }

        .navbar {
            display: flex;
            background-color: $navbar-background;
            font-size: 0.8rem;
            justify-content: space-evenly;

            .options-router {
                text-decoration: none;
                color: black;
                width: 100%;
                text-align: center;
                
                .navbar-options {
                    cursor: pointer;
                    padding: 1rem 0;
                    transition: ease-in .15s;
                    width: 100%;

                    &:hover, &:focus {
                        background-color: $hover-option;
                    }
                }
            }
        }
    }

}

@media (min-width: 480px) {
    .main-container {
        .container {
            .burger-container {
                img {
                    width: 2.5rem;
                }
            }

            .logo {
                img {
                    width: 80%;
                }
            }

            #opened-burger-menu {
                width: 70%;
            }
        }

        .navbar {
            font-size: 0.9rem;
        }
    }
}

@media (min-width: 600px) {
    .main-container {
        .container {
            .logo {
                img {
                    width: 60%;
                }
            }

            #opened-burger-menu {
                width: 50%;
            }
        }

        .navbar {
            font-size: 0.9rem;
        }
    }
}

@media (min-width: 768px) {
    .main-container {
        .container {
            .burger-container {
                img {
                    width: 2.3rem;
                }
            }

            .logo {
                img {
                    width: 40%;
                }
            }

            #shadow {
                height: 91vh;
            }

            #opened-burger-menu {
                width: 40%;
                height: 91vh;
                text-align: center;

                .login-button {
                    width: 85%;
                }
            }
        }

        .navbar {
            font-size: 0.9rem;
            justify-content: left;

            .navbar-options {
                margin-right: 2%;
            }
        }
    }
}

@media (min-width: 900px) {
    .main-container {
        .container {
            #opened-burger-menu {
                width: 35%;
            }
        }

        .navbar {
            font-size: 0.95rem;
        }
    }
}

@media (min-width: 1024px) {
    .main-container {
        .container {
            width: 100%;

            .logo {
                text-align: left;
                margin: 0.2rem 0; 

                img {
                    width: 28%;
                }
            }

            .login-container {
                width: 15%;

                .login {
                    width: 100%;
                }

                .user {
                    text-align: center;
                    font-size: 1.1rem;
                    font-weight: 600;
                    display: flex;
                    justify-content: space-evenly;

                    .user-router {
                        color: black;
                        text-decoration: none;
                        transition: ease-in 0.15s;

                        &:hover {
                            color: $login-color;
                        }
                    }

                    .logout-container {
                        cursor: pointer;
                    }
                }
            }
        }

        .navbar {
            font-size: 0.95rem;
        }
    }
}

@media (min-width: 1280px) {
    .main-container {
        .container {
            width: 92%;
            margin: 0 auto;
            justify-content: space-around;      

            .logo {
                margin: 0.2rem 0;

                img {
                    width: 25%;
                }
            }
        }
    }
}

@media (min-width: 1440px) {
    .main-container {
        .container {
            .logo {
                img {
                    width: 23%;
                }
            }

            .login-container {
                width: 13%;

                .login {
                    width: 100%;
                    .login-button {
                        font-size: 1.1rem;
                    }
                }
            }
        }

        .navbar {
            font-size: 1.1rem;

            .options-router {
                .navbar-options {
                    padding: 1.2rem 0;
                }
            }
        }
    }
}

@media (min-width: 1920px) {
    .main-container {
        .container {
            .logo {
                img {
                    width: 26%;
                }
            }

            .login-container {
                .login {
                    .login-button {
                        font-size: 1.5rem;
                    }
                }

                .user {
                    font-size: 1.7rem;
                }
            }
        }

        .navbar {
            font-size: 1.5rem;

            .options-router {
                .navbar-options {
                    padding: 1.5rem 0;
                }
            }
        }
    }
}
</style>