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
                <div class="login">
                    <router-link to="/login">
                        <LoginButton text="LOG IN" />
                    </router-link>
                </div>
            </div>
            <div id="shadow"></div>
            <div id="opened-burger-menu">
                <div class="icon-container">
                    <img src="../assets/images/close-icon.png" alt="close" id="close" @click="closeIcon">
                </div>
                <div @click="getCurrentLink" v-if="!checkIfCurrentUserObjectExists">
                    <router-link to="/login" class="login-button">
                        <LoginButton text="LOG IN" @click="openCloseBurgerMenu"/>
                    </router-link>
                </div>
                <div class="current-user" v-else>
                    <router-link to="/" class="options">
                        <div class="option first-option">MY VISITS<img src="../assets/images/arrow-right.png" alt="right arrow"></div>
                    </router-link>
                    <router-link to="/" class="options">
                        <div class="option">MY ACCOUNT <img src="../assets/images/arrow-right.png" alt="right arrow"></div>
                    </router-link>
                    <router-link to='/login' class="options">
                        <div class="option" @click="logout">LOGOUT <img src="../assets/images/arrow-right.png" alt="right arrow"></div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="navbar" id="navbar" v-if="getCurrentURL !== loginURL">
            <div class="navbar-options first-option">SERVICES</div>
            <div class="navbar-options">ABOUT</div>
            <div class="navbar-options">OPINIONS</div>
            <div class="navbar-options">TEAM</div>
        </div>        
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import LoginButton from './LoginButton.vue';
import createStore from '../store/index';

export default defineComponent ({
    components: {
        LoginButton,
    },
    setup() {
        const windowWidth = window.innerWidth;
        let getCurrentURL = ref(window.location.href);
        const loginURL = 'http://localhost:8080/login';

        const openCloseBurgerMenu = () => {
            const burgerMenu = document.getElementById('opened-burger-menu')!;
            const shadow = document.getElementById('shadow')!;

            if(burgerMenu.style.display === 'none') {
                burgerMenu.style.display = 'block';
                shadow.style.display = 'block';
            }
            else {
                burgerMenu.style.display = 'none';
                shadow.style.display = 'none';
            }

            getCurrentLink();
        }

        const closeIcon = () => {
            const closeIcon = document.getElementById('close')!;
            const burgerMenu = document.getElementById('opened-burger-menu')!;
            const shadow = document.getElementById('shadow')!;

            burgerMenu.style.display = 'none';
            shadow.style.display = 'none';
        }

        const getCurrentLink = () => {
            setTimeout(() => {
                getCurrentURL.value = window.location.href;
            }, 50);
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
    
        return {
            windowWidth,
            openCloseBurgerMenu,
            closeIcon,
            getCurrentURL,
            loginURL,
            getCurrentLink,
            getCurrentUserFromStore,
            checkIfCurrentUserObjectExists,
            logout
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
                height: 85vh;
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
                height: 85vh;
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

            .navbar-options {
                cursor: pointer;
                padding: 1rem 1rem;
                transition: ease-in .15s;

                &:hover, &:focus {
                    background-color: $hover-option;
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
                height: 83vh;
                top: 100%;
                left: 0;
                background-color: $shadow-color;
                opacity: 0.7;
            }

            #opened-burger-menu {
                display: none;
                z-index: 3;
                position: absolute;
                width: 85%;
                height: 83vh;
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
                }
            }
        }

        .navbar {
            display: flex;
            background-color: $navbar-background;
            font-size: 0.8rem;
            justify-content: space-evenly;

            .navbar-options {
                cursor: pointer;
                padding: 1rem 1rem;
                transition: ease-in .15s;

                &:hover, &:focus {
                    background-color: $hover-option;
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
            font-size: 0.95rem;
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
                height: 90vh;
            }

            #opened-burger-menu {
                width: 40%;
                height: 90vh;
                text-align: center;

                .login-button {
                    width: 85%;
                }
            }
        }

        .navbar {
            font-size: 0.95rem;
            justify-content: left;

            :first-child {
                margin-left: 6%;
            }

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
            font-size: 1rem;
        }
    }
}

@media (min-width: 1024px) {
    .main-container {
        .container { 
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
            }
        }

        .navbar {
            font-size: 0.9rem;

            :first-child {
                margin-left: 5%;
            }
        }
    }
}

@media (min-width: 1280px) {
    .main-container {
        .container {
            margin: 0 3rem;       

            .logo {
                margin: 0.2rem 0;
                img {
                    width: 25%;
                }
            }
        }

        .navbar {
            :first-child {
                margin-left: 4.5rem;
            }

            .navbar-options {
                margin-right: 0;
            }
        }
    }
}

@media (min-width: 1440px) {
    .main-container {
        .container {
            margin: 0 1.3rem;

            .logo {
                img {
                    width: 20%;
                }
            }

            .login-container {
                width: 10%;

                .login {
                    font-size: 1rem;
                }
            }
        }

        .navbar {
            :first-child {
                margin-left: 6%;
            }
        }
    }
}
</style>