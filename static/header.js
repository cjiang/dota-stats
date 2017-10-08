const Header =
  Vue.component('ds-header', {
    template: `
<v-toolbar class="light-blue" fixed clipped-left app>
  <v-toolbar-title>
    <v-icon large class="flip">leak_add</v-icon>
    <v-icon large>timeline</v-icon>
    <v-icon large>poll</v-icon>
  </v-toolbar-title>

  <v-text-field class="mx-4 playerid_input" 
                label="Player ID (\\d+)"
                single-line
                append-icon="search"
                hide-details
                v-model="next_player_id"
                v-on:keydown.enter='setPlayerId'
  ></v-text-field>

  <v-toolbar-title v-if="self && self.profile">
    {{self.profile.personaname}}
    <template v-if="this.$route.name">
      <v-icon>chevron_right</v-icon>
      {{this.$route.name}}
    </template>
  </v-toolbar-title>
</v-toolbar>
      `,
    props: ["player_id", "self"],
    methods: {
      setPlayerId: function () {
        if (this.next_player_id && Number(this.next_player_id)) {
          name = this.$route.name || 'heroes';
          player_id = this.next_player_id;
          this.$router.push({ name, params: { player_id } });
        } else {
          this.$router.push('/');
        }
      }
    },
    data: function () {
      return {
        next_player_id: this.player_id
      }
    },
    watch: { 
      player_id: function(x) {
        this.next_player_id = x;
      }
    },
  });
