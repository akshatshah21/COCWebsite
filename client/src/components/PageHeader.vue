<template>
  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="mr-2 ml-2 pl-0"><img src="../assets/coc_logo.png" height="50"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text dark :to="{name: 'home'}"><v-icon>fas fa-home</v-icon>&nbsp;Home</v-btn>
        <v-btn text dark ><v-icon>fas fa-info-circle</v-icon>&nbsp;About Us</v-btn>
        <v-btn text dark :to="{name: 'events'}"><v-icon>fas fa-laptop-code</v-icon>&nbsp;Activities</v-btn>
        <v-btn text dark ><v-icon>fas fa-images</v-icon>&nbsp;Glimpses</v-btn>
        <v-btn text dark ><v-icon>fas fa-users</v-icon>&nbsp;Team</v-btn>
        <v-menu offset-y transition="scale-transition" v-if="$store.state.isAdmin">
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              v-on="on"
              text
            >
              <v-icon>fas fa-user-shield</v-icon>&nbsp;
              Admin
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="$router.push({name: item.link})"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
 
        <v-btn text dark v-if="$store.state.isLoggedIn" @click="logout"><v-icon>fas fa-sign-out-alt</v-icon>&nbsp;LogOut&nbsp;</v-btn>
        <v-btn icon fab dark large :to="{name: 'profile'}" v-if="$store.state.isLoggedIn">
          <v-avatar color="red" class="mt-2">
            <span class="white--text headline">{{this.$store.state.user.substring(0,1)}}</span>
          </v-avatar>
        </v-btn>
        <v-btn text dark :to="{name: 'auth'}" v-if="!$store.state.isLoggedIn"><v-icon>fas fa-sign-in-alt</v-icon>&nbsp;SignUp</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-navigation-drawer dark v-model="drawer" absolute temporary app style="position:fixed; top:0; left:0; overflow-y:scroll;">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-btn icon fab dark large :to="{name: 'profile'}" v-if="$store.state.isLoggedIn">
              <v-avatar color="red" class="mt-2" >
                <span class="white--text headline">{{this.$store.state.user.substring(0,1)}}</span>
              </v-avatar>
            </v-btn>
          </v-list-item-title>
          <v-list-item-subtitle>
            Community of Coders
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav rounded>

        <v-list-item dark link color="black" :to="{name: 'home'}">
            <v-list-item-icon>
              <v-icon>fas fa-home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" >
            <v-list-item-icon>
              <v-icon>fas fa-info-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>About Us</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" :to="{name: 'events'}">
            <v-list-item-icon>
              <v-icon>fas fa-laptop-code</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Activities</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black">
            <v-list-item-icon>
              <v-icon>fas fa-images</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Glimpses</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black">
            <v-list-item-icon>
              <v-icon>fas fa-users</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Team</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" v-if="$store.state.isAdmin" :to="{name: 'add-event'}">
            <v-list-item-icon>
              <v-icon>far fa-calendar-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>AddEvents</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" v-if="$store.state.isAdmin" :to="{name: 'add-form'}">
            <v-list-item-icon>
              <v-icon>far fa-calendar-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>AddEventForm</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" v-if="$store.state.isLoggedIn" @click="logout">
            <v-list-item-icon>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" v-if="!$store.state.isLoggedIn" :to="{name: 'auth'}">
            <v-list-item-icon>
              <v-icon>fas fa-sign-in-alt</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>SignUp</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" @click="drawer = false ">
            <v-list-item-icon>
              <v-icon>fas fa-window-close</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Close</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    search: '',
    items: [
      { 
        title: 'Add Event' ,
        link: 'add-event'
      },
      { 
        title: 'Add-From',
        link: 'add-form'
      }
    ],
  }),
  methods: {
    logout () {
      this.$store.dispatch('setIsLoggedIn',false)
      this.$store.dispatch('setUser',null)
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setIsAdmin',false)
      this.$store.dispatch('setCookie')
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
</style>