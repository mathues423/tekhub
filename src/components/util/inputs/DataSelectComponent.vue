<script lang="ts">
import { defineComponent, ref, shallowRef } from 'vue'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { format } from 'date-fns';

export default defineComponent({
      data() {
            return{
                  date_picker: shallowRef(undefined as Date | undefined),
                  time_picker: ref(null as string | null),
                  is_in_select_date: false,
                  data_show: undefined as Date | undefined,
                  data_show_aux: new Date(),
                  data_saida: {
                        data: {
                              ano: Number(undefined),
                              mes: Number(undefined),
                              dia: Number(undefined)
                        },
                        tempo: {
                              hora: Number(undefined),
                              minuto: Number(undefined),
                              segundo: Number(undefined)
                        }
                  }
            }
      },
      components:{
            VTimePicker
      },
      props:{
            is_in_select_date_prop:{
                  type: Boolean,
                  default: false
            },
            texto_select:{
                  type: String,
                  default: 'Selecione a data'
            },
            is_disabled:{
                  type: Boolean,
                  default: false
            },
            date_aux:{
                  type: Date,
                  default: undefined
            },
            erro_verify:{
                  type: Boolean,
                  required: true
            },
            erro_mensagem:{
                  type: String,
                  required: true
            }
      },
      watch:{
            is_in_select_date_prop(is_in_select_date_new){
                  this.is_in_select_date = is_in_select_date_new
            },
            date_picker(date_picker_new: Date){
                  this.data_show = undefined;

                  this.data_saida.data.ano = date_picker_new.getFullYear();
                  this.data_saida.data.mes = date_picker_new.getMonth() + 1;
                  this.data_saida.data.dia = date_picker_new.getDate();
                  if (this.data_show == undefined) {
                        this.data_show = new Date(this.data_saida.data.ano,
                              this.data_saida.data.mes - 1,
                              this.data_saida.data.dia,
                              this.data_saida.tempo.hora,
                              this.data_saida.tempo.minuto,
                              this.data_saida.tempo.segundo
                        );
                  }
            },
            time_picker(time_picker_new){
                  this.data_show = undefined;

                  const timer = time_picker_new.split(':', 3)
                  this.data_saida.tempo.hora = timer[0];
                  this.data_saida.tempo.minuto = timer[1];
                  this.data_saida.tempo.segundo = timer[2] ? timer[2] : 0;
                  if (this.data_show == undefined) {
                        this.data_show = new Date(this.data_saida.data.ano, 
                              this.data_saida.data.mes - 1,
                              this.data_saida.data.dia,
                              this.data_saida.tempo.hora,
                              this.data_saida.tempo.minuto,
                              this.data_saida.tempo.segundo
                        );
                  }
            },
            date_aux(date_new: Date){
                  this.data_show = undefined
                  this.data_show = new Date(
                        date_new.getFullYear(),
                        date_new.getMonth(),
                        date_new.getDate(),
                        date_new.getHours(),
                        date_new.getMinutes(),
                        date_new.getSeconds()
                  )
                  this.date_picker = this.data_show
                  this.time_picker = format(this.data_show, 'HH:mm:ss')
            }
      },
      computed:{
            DataFormatadaValue(): string|undefined{
                  if(this.data_show != undefined)
                        return format(this.data_show, 'dd/MM/yyyy HH:mm:ss')
                  else
                        return undefined
            }
      },
      methods:{
            trocaEstado(cond: boolean){
                  if(this.data_show == undefined){
                        this.data_show = new Date()
                        this.date_picker = this.data_show
                        this.time_picker = format(this.data_show, 'HH:mm:ss')
                  }
                  this.verifica_saida()
                  this.$emit('isOpen', cond)
            },
            verifica_saida(){
                  if(this.data_saida.data.ano != undefined && this.data_saida.data.mes != undefined && this.data_saida.data.dia != undefined && this.data_saida.tempo.hora != undefined && this.data_saida.tempo.minuto != undefined && this.data_saida.tempo.segundo != undefined)
                        this.$emit('saida', this.data_saida)
                  else
                        this.$emit('saida', undefined)
            }
      },
      emits:['isOpen', 'saida']
})
</script>

<template>
<v-dialog 
      v-model="is_in_select_date"
      @update:model-value="trocaEstado(false)"
      transition="dialog-top-transition"
      max-width="750"
      scrollable>
      <v-sheet class="w-100 h-100">
            <v-row no-gutters class="mx-auto">
                  <v-col class="v-col-12 v-col-md-6">
                        <v-date-picker
                              title="Selecione a Data"
                              header="Data"
                              min-width="350"
                              v-model="date_picker"
                        />
                  </v-col>
                  <v-col class="v-col-12 v-col-md-6">
                        <v-time-picker
                              min-width="350" 
                              format="24hr"
                              title="Selecione o horario"
                              v-model="time_picker"
                              use-seconds
                        />
                  </v-col>
                  <v-col class="v-col-12 v-row pl-3 pt-2" no-gutters>
                        <v-col class="v-col-12">
                              <span class="text-h5">Valor escolhido: </span> 
                              <span class="text-h6">{{!Number.isNaN(data_saida.data.dia) ? `${data_saida.data.dia}/` : ''}}
                                    {{!Number.isNaN(data_saida.data.mes) ? `${data_saida.data.mes}/` : ''}}
                                    {{!Number.isNaN(data_saida.data.ano) ? `${data_saida.data.ano}` : ''}}
                                    {{!Number.isNaN(data_saida.tempo.hora) ? ` (${data_saida.tempo.hora}:` : ''}}
                                    {{!Number.isNaN(data_saida.tempo.minuto) ? `${data_saida.tempo.minuto}:` : ''}}
                                    {{!Number.isNaN(data_saida.tempo.segundo) ? `${data_saida.tempo.segundo})` : ''}}
                              </span>
                        </v-col>
                        <v-col class="v-col-12" align="end">
                              <v-btn 
                                    color="success" 
                                    @click="trocaEstado(false)"
                                    text="Confirmar"
                              />
                        </v-col>
                  </v-col>
            </v-row>
      </v-sheet>
</v-dialog>

      <button class="w-100" @click="trocaEstado(true)" :disabled="is_disabled">
            <v-text-field
                  :label="texto_select"
                  prepend-icon=""
                  :prepend-inner-icon="!is_disabled ? 'mdi mdi-calendar' : 'mdi mdi-calendar-remove'"
                  v-model="DataFormatadaValue"
                  :error-messages="erro_verify ? erro_mensagem : undefined"
            variant="outlined" density="compact" disabled/>
      </button>
</template>