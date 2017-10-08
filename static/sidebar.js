const Sidebar =
  Vue.component('ds-sidebar', {
    template: `
    <v-navigation-drawer clipped app>
      <v-list>
        <router-link v-for="page in pages" :key="page"
                     :to="{name: page}">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{page[0].toUpperCase() + page.slice(1)}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <v-divider></v-divider>
        <v-subheader class="grey--text">Friends</v-subheader>
        <v-list dense>
            <router-link v-for="friend in friends" :key="friend.account_id"
                          :to="{name: $route.name, params: {player_id: friend.account_id}}">
              <v-list-tile>
                <v-list-tile-title class="pl-3">
                  {{friend.personaname}}
                </v-list-tile-title>
              </v-list-tile>
            </router-link>
        </v-list>
      </v-list>
    </v-navigation-drawer>`,
    props: ["friends"],
    data () {
      return {
        pages: ['heroes', 'roles', 'matches']
      }
    }
});
