<template>
  <v-layout class="mt-4" justify-center>
    <v-flex md4>
      <v-card>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs4>
              <v-subheader>Profile theme</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-select
                  v-model="theme"
                  :items="themes"
                  :selected="0"
                  label="Select a theme..."
                  single-line
              ></v-select>
            </v-flex>
            <v-flex xs12 v-if="custom">
              <v-layout>
                  <v-flex xs4>
                      <v-subheader>Custom theme</v-subheader>
                  </v-flex>
                  <v-flex xs8 v-if="custom">
                      <v-layout>
                          <v-flex xs4>
                              <v-text-field
                                  class="pr-2"
                                  v-model="color_1"
                                  label="Foreground"
                                  :hint="color_1"
                                  persistent-hint
                                  type="color"
                              ></v-text-field>
                          </v-flex>
                          <v-spacer></v-spacer>
                          <v-flex xs4>
                              <v-text-field
                                  class="pr-1"
                                  v-model="color_2"
                                  label="Background"
                                  :hint="color_2"
                                  persistent-hint
                                  type="color"
                              ></v-text-field>
                          </v-flex>
                          <v-spacer></v-spacer>
                          <v-flex xs4>
                              <v-text-field
                                  class="pl-1"
                                  v-model="color_3"
                                  label="Text"
                                  :hint="color_3"
                                  persistent-hint
                                  type="color"
                              ></v-text-field>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>
              <v-layout>
                  <v-flex xs4>
                      <v-subheader>Background</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                      <v-layout>
                          <v-text-field
                              placeholder="https://domain.com/background.jpg"
                          ></v-text-field>
                      </v-layout>
                  </v-flex>
              </v-layout>
              </v-flex>
            <v-flex xs4>
              <v-subheader>Private</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-switch></v-switch>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  
</template>

<script>
  export default {
    data () {
      return {
        color_1: null,
        color_2: null,
        color_3: null,
        themes: [
          { text: 'Custom' },
          { text: 'Addswift' },
          { text: 'Autumn Breeze' },
          { text: 'Purple Storm' },
          { text: 'White Garden' },
          { text: 'Bright Ocean' }
        ],
        theme: null
      }
    },
    computed: {
        custom() {
            return this.theme && this.theme.text == 'Custom'
        }
    }
  }
</script>