const Heroes =
  Vue.component('ds-Heroes', {
    template: `
<div>
    <v-data-table
        :headers="headers"
        :items="namedHeroes"
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
        <td>{{ props.item.wr.toFixed() }}%</td>
        <td>{{ props.item.wins }}</td>
        <td>{{ props.item.games }}</td>
      </template>
    </v-data-table>
</div>
`,
    props: ["heroes", "selfHeroes"],
    computed: {
      namedHeroes() {
        if (!this.heroes || !this.selfHeroes.length) return [];

        return this.selfHeroes.map(sh => {
          const [a, b] = toBetaDist(sh.wins, sh.games);
          const [muMinus, mu, muPlus] = betaCI(a, b);
          return {
            name: this.heroes[sh.hero_id].name,
            muMinus,
            mu,
            muPlus,
            betaCssGradient: betaCssGradient(a, b),
            wins: sh.wins,
            games: sh.games,
            wr: sh.wins / sh.games * 100,
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
          { text: 'Hero name', value: 'id', defaultDesc: false },
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
