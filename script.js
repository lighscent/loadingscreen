const tips = [
    'Besoin d\'aide ? Rejoignez notre Discord : discord.gg/5tJDUk4UbX',
    'Vous devrez passer votre permis de conduire pour conduire un véhicule.',
    'Envie de monter un business ? Rendez-vous à la mairie pour enregistrer votre entreprise.',
    'Vous pouvez acheter des vêtements à la boutique de vêtements.',
    'Le staff ne vous demandera jamais vos identifiants.',
];

document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#loadingscreen',
        data: () => {
            return {
                changelog: null,
                status: 'En attente du serveur',
                percentage: 0,
                initSessionLookup: {},
                currentTipIndex: 0,
                tips: null,
            }
        },
        methods: {
            nextTip() {
                this.currentTipIndex = (this.currentTipIndex + 1) >= this.randomizedTips.length ? 0 : this.currentTipIndex + 1;
            },
        },
        computed: {
            currentTip() {
                if (this.randomizedTips === null) {
                    return 'Etre toxic ne servira à rien. Reste calme et amical.';
                }

                return this.randomizedTips[this.currentTipIndex];
            }
        },
        created() {
            this.changelog = changelog_generated;
            this.randomizedTips = _.shuffle(tips);

            window.addEventListener('message', (event) => {
                if (event.data !== undefined && event.data.eventName !== undefined) {
                    switch (event.data.eventName) {
                        case 'onLogLine':
                            this.status = event.data.message;
                            break;
                        case 'loadProgress':
                            this.percentage = (event.data.loadFraction * 100).toFixed(2) || -1;
                            break;
                        case 'initFunctionInvoking':
                            this.status = 'Loading ' + event.data.name;
                            break;
                        case 'initFunctionInvoked':
                            this.status = 'Loaded ' + event.data.name;
                            break;
                        default:
                            break;
                    }
                } else {

                }
            });
        },
        mounted() {
            setInterval(() => {
                this.nextTip();
            }, 4000);

            addEventListener("mousemove", (event) => {
                let cursor = document.getElementById("cursor");
                cursor.style.left = event.pageX - 7;
                cursor.style.top = event.pageY;
            });
        }
    });
});
