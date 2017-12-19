const Roles =
  Vue.component('ds-roles', {
    template: `
<div>
    <v-data-table
        :headers="headers"
        :items="selfRoles"
        class="elevation-3"
        hide-actions
        :pagination.sync="pagination"
        dark>

      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text"
            :class="['text-xs-left subheading column sortable',
                      pagination.descending ? 'desc' : 'asc',
                      header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            {{ header.text }}
            <v-icon>arrow_upward</v-icon>
          </th>
        </tr>
      </template>

      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td :style="props.item.betaCssGradient"></td>
        <td>{{ (props.item.muMinus * 100).toFixed() }}%</td>
        <td>{{ (props.item.mu * 100).toFixed() }}%</td>
        <td>{{ (props.item.muPlus * 100).toFixed() }}%</td>
        <td>{{ (props.item.wr * 100).toFixed() }}%</td>
        <td>{{ props.item.wins }}</td>
        <td>{{ props.item.games }}</td>
      </template>
    </v-data-table>
</div>
`,
    props: ["heroes", "selfHeroes"],
    computed: {
      selfRoles() {
        if (!this.heroes || !this.selfHeroes.length) return [];
        const roles = new Map();
        for (const sh of this.selfHeroes) {
          let sources = [
            ...this.heroes[sh.hero_id].attributes,
            ...Object.keys(this.heroes[sh.hero_id].roles)
          ];
          for (const role of sources) {
            if (role === 'Complexity') continue;
            let r = roles.get(role);
            if (r === undefined) {
              r = { name: role, wins: 0, games: 0 };
            }
            r.wins += sh.wins;
            r.games += sh.games;
            roles.set(role, r);
          }
        }
        return Array.from(roles.values(), r => {
          const [a, b] = toBetaDist(r.wins, r.games);
          const [muMinus, mu, muPlus] = betaCI(a, b);
          return {
            ...r,
            muMinus,
            mu,
            muPlus,
            betaCssGradient: betaCssGradient(a, b),
            wr: r.wins / r.games
          };
        });
      }
    },
    methods: {
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = this.headers.find(h => h.value === column).defaultDesc
        }
      }
    },
    data() {
      return {
        pagination: { sortBy: 'muMinus', descending: true, rowsPerPage: -1 },
        headers: [
          { text: 'Role', value: 'id', defaultDesc: false },
          { text: "Est. Win % (showing 25% to 75%)", value: 'mu', defaultDesc: true },
          { text: "mu - sigma", value: 'muMinus', defaultDesc: true },
          { text: "mu", value: 'mu', defaultDesc: true },
          { text: "mu + sigma", value: 'muPlus', defaultDesc: true },
          { text: 'Win %', value: 'wr', defaultDesc: true },
          { text: 'Wins', value: 'wins', defaultDesc: true },
          { text: 'Games', value: 'games', defaultDesc: true },
        ],
      }
    }
  });
