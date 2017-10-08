const LAYOUT_COMPONENTS = { header: Header, sidebar: Sidebar }
const LAYOUT_PROPS = { header: true, sidebar: true }
const routes = [
  {
    name: "heroes",
    path: '/heroes/:player_id',
    components: { ...LAYOUT_COMPONENTS, default: Heroes },
    props: { ...LAYOUT_PROPS, default: true },
  },
  {
    name: "roles",
    path: '/roles/:player_id',
    components: { ...LAYOUT_COMPONENTS, default: Roles },
    props: { ...LAYOUT_PROPS, default: true }
  },
  {
    name: "matches",
    path: '/matches/:player_id',
    components: { ...LAYOUT_COMPONENTS, default: Matches },
    props: { ...LAYOUT_PROPS, default: true }
  },
  {
    name: "streaks",
    path: '/streaks/:player_id',
    components: { ...LAYOUT_COMPONENTS, default: Streaks },
    props: { ...LAYOUT_PROPS, default: true }
  },
  {
    path: '/:player_id',
    redirect: { name: "heroes" },
  },
  {
    name: "",
    path: '*',
    components: {
      ...LAYOUT_COMPONENTS, default: Vue.component('ds-notfound',
        { template: `
  <h4 class="grey--text lighten-4">Enter a valid player ID</h4>
  ` }
      )
    },
    props: { ...LAYOUT_PROPS }
  }
]
const router = new VueRouter({ routes });

const app = new Vue({
  router,
  asyncComputed: {
    self: {
      async get() {
        if (!this.$route.name) return [];
        const pid = this.$route.params["player_id"];
        if (!pid) return [];
        const resp = await fetch(`https://api.opendota.com/api/players/${pid}`);
        return await resp.json();
      },
      default: []
    },
    selfHeroes: {
      async get() {
        if (!this.$route.name) return [];
        const pid = this.$route.params["player_id"];
        if (!pid) return [];
        const resp = await fetch(`https://api.opendota.com/api/players/${pid}/heroes`);
        selfHeroes = await resp.json();
        return selfHeroes.map(sh => ({
          hero_id: sh.hero_id,
          wins: sh.win,
          games: sh.games,
        }));
      },
      default: []
    },
    friends: {
      async get() {
        if (!this.$route.name) return [];
        const pid = this.$route.params["player_id"];
        if (!pid) return [];
        const resp = await fetch(`https://api.opendota.com/api/players/${pid}/peers`);
        const peers = await resp.json();

        const wg = peers.map(peer => peer.with_games);
        const maxWg = Math.max(...wg);
        const threshold = Math.max(0, Math.min(maxWg / 5, maxWg - 100));
        return peers.filter(peer => peer.with_games >= threshold);
      },
      default: []
    },
    heroes: {  // map from hero.id to { name: string; roles: string[]; }
      async get() {
        const resp = await fetch(`https://api.opendota.com/api/heroes`);
        const origHeroes = await resp.json();
        return Object.assign({},
          ...origHeroes.map(hero => (
            {
            [hero.id]: {
              name: hero.localized_name,
              attributes: [hero.primary_attr, hero.attack_type],
              roles: ROLES[hero.localized_name]
            }
            })));
      },
      default: null
    }
  }
}).$mount('#app')
