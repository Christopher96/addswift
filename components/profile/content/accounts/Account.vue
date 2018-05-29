/*
 * Dynamic card for accounts, contains title, image, description, delete button (not implemented)
 */
 
 <template>
  <v-layout>
    <v-flex xs12 sm6 md4>
      <v-card>
          <v-card-actions
            :style="'background-color:' + vendor.color + ';'" 
          >
            <v-btn icon>
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
            <span class="subheading">{{ vendor.title }}</span>
            <v-spacer></v-spacer>
            <v-tooltip 
            v-if="!isOwner"
            bottom>
              <v-btn
                icon
                slot="activator"
              >
                <v-icon>person_add</v-icon>
              </v-btn>
              <span>Follow/Add</span>
            </v-tooltip>
            <v-tooltip 
            v-if="isOwner"
            bottom>
              <v-btn
                icon
                slot="activator"
                @click="remove" 
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <span>Delete account</span>
            </v-tooltip>
          </v-card-actions>
        <v-card-media :src="data.picture" height="150px">
        </v-card-media>
        <v-card-title>
          <div>
            <a :href="data.link" class="title mb-1">{{ data.name }}</a>
            <div>
              <span class="grey--text caption">{{ created }}</span>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['account'],
  data() {
      return {
        icon: "fa-"+this.account.vendor.site,
        ...this.account
      }
  },
  computed: {
    ...mapGetters({
      isOwner: 'profileOwner'
    })
  },
  methods: {
    remove() {
      
    }
  },
}
</script>


