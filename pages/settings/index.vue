/*
 * Settings page for logged in users, including privacy option and delete button
 */

<template>
    <ContainerCard title="Settings">
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
                      <v-layout class="color-controls">
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
                <v-subheader>Font Size</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-slider :label="fontSize + ' px'" min="12" max="30" v-model="fontSize" thumb-label></v-slider>
                </v-flex>
                <v-flex xs4>
                    <v-subheader>Private</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-switch
                        class="pt-2"
                        v-model="e1"
                    ></v-switch>
                </v-flex>
                <v-flex xs4>
                <v-subheader>Account</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-btn color="error">
                        Delete account
                    </v-btn>
                </v-flex>
                <v-flex xs4>
                <v-subheader>Subscription</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-btn color="success">
                        Become a member
                    </v-btn>
                </v-flex>
          </v-layout>
        </v-container>
    </ContainerCard>
</template>

<script>
import ContainerCard from '@/components/base/layout/ContainerCard'

  export default {
    data () {
        return {
            fontSize: null,
            e1: false,
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
            theme: null,
        }
    },
    computed: {
        custom() {
            return this.theme && this.theme == this.themes[0]
        }
    },
    middleware: 'authenticated',
    head() {
        return {
            title: 'Settings'
        }
    },
    components: {
        ContainerCard
    }
}
</script>

<style lang="stylus">
.color-controls
    .input-group__details::before
        display none
</style>
