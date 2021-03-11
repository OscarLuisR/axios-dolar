<template>
    <v-app>
        <v-container>
            <v-row :wrap="true">
                <v-col cols="12">
                    <v-card>
                        <v-date-picker
                            v-model="fecha"
                            full-width
                            class="mt-4"
                            locale="es-cl"
                            :min="minimo"
                            :max="maximo"
                            @change="getDolar"
                        >
                        </v-date-picker>                        
                    </v-card>
                    
                    <v-card color="error" dark>
                        <!-- <v-card-text class="display-1 text-center">Valor del Dolar: {{ (valorDolar > 0 ? valorDolar : 'No especificado') }} </v-card-text> -->
                        <v-card-text class="display-1 text-center">Valor del Dolar: {{ valorDolar }} </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-dialog v-model="loading.estado" hide-overlay persistent width="300">                
                <v-card color="primary" dark>
                    <v-card-text>{{ loading.titulo }}
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
    import { format } from 'date-fns';
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "App",
        data() {
            return {
                fecha: format(new Date(), 'yyyy-MM-dd'),
                minimo: '1984',
                maximo: format(new Date(), 'yyyy-MM-dd'), // Lo cambie porque me traia un dia mas en la fecha new Date().toISOString().substr(0, 10), //'2021-01-29',
                valorDolar: 0
            };
        },
        methods: {
            ...mapActions(['mostrarLoading', 'ocultarLoading']),

            async getDolar() {
                try {
                    this.mostrarLoading({titulo: 'Accediendo a Informacion'});

                    let datos = await this.axios.get(`https://mindicador.cl/api/dolar/${this.fechaFormateada}`);

                    if (datos.data.serie.length > 0) {
                        this.valorDolar = datos.data.serie[0].valor;
                    }else {
                        this.valorDolar = 'No especificado'
                    }                    
                } catch (error) {
                    console.log(error)
                }

                this.ocultarLoading();
            }
        },
        computed: { 
            ...mapState(['loading']),

            fechaFormateada() {
                // let arrayFecha = this.fecha.split('-').reverse().join('-');

                let dia = format(Date.parse(this.fecha), 'dd-MM-yyyy');

                return dia;
            }
        },
        created() {
            this.getDolar();
        }
    };
</script>