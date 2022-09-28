namespace fgui.utils {
    
        export class AssetLoader extends PIXI.Loader {
            protected static $resources:any = {};

            public constructor(baseUrl?:string, concurrency?:number) {
                super(baseUrl, concurrency);
            }

            protected _onComplete():void {
                AssetLoader.addResources(this.resources);
                super._onComplete();
            };

            public static get resourcesPool():any {
                return AssetLoader.$resources;
            }

            public static destroyResource(key:string):void {
                let res = AssetLoader.$resources[key];
                if(res) {
                    if(!res.isComplete)
                        res.abort();
                    res.children = null;
                    res.data = null;
                    res.texture && res.texture.destroy();
                    res.textures = null;
                    res.xhr = null;

                    AssetLoader.$resources[key] = null;
                    delete AssetLoader.$resources[key];
                }
            }

            public static addResources(res:any):void {
                if(!res) return;
                for(let key in res)   //override the item which has same key name
                    AssetLoader.$resources[key] = res[key];
            }
        }
    }