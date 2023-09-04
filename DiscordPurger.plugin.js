/**
 * @name DiscordPurger
 * @version 0.0.1
 * @description Clear Discord Memory
 * @invite mr2X589E2f
 */

module.exports = (() => {
    const config = {
        info: {
            name: "DiscordPurger",
            authors: [{
                name: "Wippy/Suspect/Shadow",
                discord_id: "792372560322756608"
            }],
            version: "0.0.1",
            description: "Clear Discord Memory",
        },
        defaultConfig: [{
            type: 'switch',
            id: 'PurgeMemoryLoop',
            name: 'Purge Memory Loop',
            note: 'Purge Your Memory Every 1 Minute',
            value: true,
        },],
    };

    return !global.ZeresPluginLibrary ?

        class {
            constructor() {
                this._config = config;
            }
            getName() {
                return config.info.name;
            }
            getAuthor() {
                return config.info.authors.map((a) => a.name).join(", ");
            }
            getDescription() {
                return config.info.description;
            }
            getVersion() {
                return config.info.version;
            }
            load() {}
            start() {this.onStart()}
            stop() {}
        } :
        (([Plugin, Api]) => {

            const plugin = (Plugin, Library) => {

                const {
                    Toasts
                } = Library;

                return class DiscordPurger extends Plugin {
                    purgeMemoryScript() {       
                        Toasts.show("Purged Memory, Wippy Memory Purger", {
                            type: "info",
                            timeout: 2000
                        });
                        DiscordNative.processUtils.purgeMemory();   
                    }
                    onStart() {
                        const LoopPurge = this.PurgeMemoryLoop
                        purgeMemoryScript()
                        while (LoopPurge == true) {
                            this.purgeInterval = setInterval(() => {
                                purgeMemoryScript()
                            }, 60000);   
                        }
                    }
                    settingsWarning() {}
                    onStop() {clearInterval(this.purgeInterval)}
                    getSettingsPanel() {
                        const panel = this.buildSettingsPanel();
                        return panel.getElement();
                    }
                };
            };
            return plugin(Plugin, Api);
        })(global.ZeresPluginLibrary.buildPlugin(config));
})();