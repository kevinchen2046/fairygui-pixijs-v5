
namespace PIXI.extras {

    export class TilingSprite extends PIXI.TilingSprite {

        protected $flipX: boolean = false;
        protected $flipY: boolean = false;
        protected $frameId: string;

        protected static $cachedTexturePool: { [key: string]: { refCount: number, texture: PIXI.Texture } } = {};

        public constructor(frameId?: string, tex?: PIXI.Texture) {
            super(tex);
            this.$frameId = frameId;
        }

        public get flipX(): boolean {
            return this.$flipX;
        }

        public get flipY(): boolean {
            return this.$flipY;
        }

        public set flipX(v: boolean) {
            if (this.$flipX != v) {
                this.$flipX = v;
                fgui.GTimer.inst.callLater(this.updateUvs, this);
            }
        }

        public set flipY(v: boolean) {
            if (this.$flipY != v) {
                this.$flipY = v;
                fgui.GTimer.inst.callLater(this.updateUvs, this);
            }
        }

        private combineCacheId(flipx: boolean, flipy: boolean): string {
            if (!this.$frameId || this.$frameId == "") return null;
            return `${this.$frameId}${flipx ? '_fx' : ''}${flipy ? '_fy' : ''}`;
        }

        private getTextureFromCache(flipx: boolean, flipy: boolean): PIXI.Texture {
            const cachedid = this.combineCacheId(flipx, flipy);
            if (cachedid == null) return this.texture;

            let ret = TilingSprite.$cachedTexturePool[cachedid];
            if (!ret) {
                ret = {
                    refCount: 1,
                    texture: this.createFlippedTexture(this.texture, flipx, flipy)
                };
                TilingSprite.$cachedTexturePool[cachedid] = ret;
            }
            else
                ret.refCount++;
            return ret.texture;
        }

        private tryRemoveTextureCache(flipx: boolean, flipy: boolean): boolean {
            const cachedid = this.combineCacheId(flipx, flipy);
            if (!cachedid) return false;

            let ret = TilingSprite.$cachedTexturePool[cachedid];
            if (ret) {
                ret.refCount--;
                if (ret.refCount <= 0) {
                    ret.texture.destroy();
                    delete TilingSprite.$cachedTexturePool[cachedid];
                }
                return true;
            }
            return false;
        }

        private createFlippedTexture(origTexture: PIXI.Texture, flipx: boolean, flipy: boolean): PIXI.Texture {
            let newTex = origTexture.clone();

            let uvs = newTex["_uvs"] as PIXI.TextureUvs;
            if (this.$flipX) {
                const tx0 = uvs.x0;
                const tx3 = uvs.x3;
                uvs.x0 = uvs.x1;
                uvs.x1 = tx0;
                uvs.x3 = uvs.x2;
                uvs.x2 = tx3;
            }
            if (this.$flipY) {
                const ty0 = uvs.y0;
                const ty1 = uvs.y1;
                uvs.y0 = uvs.y3;
                uvs.y3 = ty0;
                uvs.y1 = uvs.y2;
                uvs.y2 = ty1;
            }
            //uvs.
            // uvs.uvsUint32[0] = (uvs.y0 * 65535 & 0xFFFF) << 16 | uvs.x0 * 65535 & 0xFFFF;
            // uvs.uvsUint32[1] = (uvs.y1 * 65535 & 0xFFFF) << 16 | uvs.x1 * 65535 & 0xFFFF;
            // uvs.uvsUint32[2] = (uvs.y2 * 65535 & 0xFFFF) << 16 | uvs.x2 * 65535 & 0xFFFF;
            // uvs.uvsUint32[3] = (uvs.y3 * 65535 & 0xFFFF) << 16 | uvs.x3 * 65535 & 0xFFFF;
            uvs.uvsFloat32[0] = (uvs.y0 * 65535 & 0xFFFF) << 16 | uvs.x0 * 65535 & 0xFFFF;
            uvs.uvsFloat32[1] = (uvs.y1 * 65535 & 0xFFFF) << 16 | uvs.x1 * 65535 & 0xFFFF;
            uvs.uvsFloat32[2] = (uvs.y2 * 65535 & 0xFFFF) << 16 | uvs.x2 * 65535 & 0xFFFF;
            uvs.uvsFloat32[3] = (uvs.y3 * 65535 & 0xFFFF) << 16 | uvs.x3 * 65535 & 0xFFFF;
            return newTex;
        }

        private updateUvs(): void {
            if (!this.texture) return;

            if (this.$flipX || this.$flipY) {
                let cachedTex = this.getTextureFromCache(this.$flipX, this.$flipY);
                if (this.texture != cachedTex)
                    this.texture = cachedTex;
            }
        }

        public destroy(options?: PIXI.IDestroyOptions | boolean): void {
            this.tryRemoveTextureCache(this.$flipX, this.$flipY);
            super.destroy(options);
        }
    }
}
