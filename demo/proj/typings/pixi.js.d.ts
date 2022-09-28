
declare namespace PIXI.utils {
    /////////////////////////////////////////////////
    ////////////////../eventemitter3//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /**
          * Minimal `EventEmitter` interface that is molded against the Node.js
          * `EventEmitter` interface.
          */
    class EventEmitter<EventTypes extends string | symbol = string | symbol> {
        static prefixed: string | boolean;

        /**
         * Return an array listing the events for which the emitter has registered
         * listeners.
         */
        eventNames(): Array<EventTypes>;

        /**
         * Return the listeners registered for a given event.
         */
        listeners(event: EventTypes): Array<EventEmitter.ListenerFn>;

        /**
         * Return the number of listeners listening to a given event.
         */
        listenerCount(event: EventTypes): number;

        /**
         * Calls each of the listeners registered for a given event.
         */
        emit(event: EventTypes, ...args: Array<any>): boolean;

        /**
         * Add a listener for a given event.
         */
        on(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;
        addListener(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;

        /**
         * Add a one-time listener for a given event.
         */
        once(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;

        /**
         * Remove the listeners of a given event.
         */
        removeListener(event: EventTypes, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;
        off(event: EventTypes, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;

        /**
         * Remove all listeners, or those of the specified event.
         */
        removeAllListeners(event?: EventTypes): this;
    }

    export namespace EventEmitter {
        export interface ListenerFn {
            (...args: Array<any>): void;
        }

        export interface EventEmitterStatic {
            new <EventTypes extends string | symbol = string | symbol>(): EventEmitter<EventTypes>;
        }

        export const EventEmitter: EventEmitterStatic;
    }
}
declare namespace PIXI {
    /////////////////////////////////////////////////
    ////////////////accessibility//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * The Accessibility manager recreates the ability to tab and have content read by screen readers.
     *
     * A DisplayObject can be made accessible just like it can be made interactive. This manager will map the
     * events as if the mouse was being used, minimizing the effort required to implement.
     *
     * An instance of this class is automatically created by default, and can be found at `renderer.plugins.accessibility`
     *
     * @class
     * @memberof PIXI
     */
    export class AccessibilityManager {
        /** Setting this to true will visually show the divs. */
        debug: boolean;
        /**
         * The renderer this accessibility manager works for.
         *
         * @type {PIXI.CanvasRenderer|PIXI.Renderer}
         */
        renderer: AbstractRenderer | Renderer;
        /** Internal variable, see isActive getter. */
        private _isActive;
        /** Internal variable, see isMobileAccessibility getter. */
        private _isMobileAccessibility;
        /** Button element for handling touch hooks. */
        private _hookDiv;
        /** This is the dom element that will sit over the PixiJS element. This is where the div overlays will go. */
        private div;
        /** A simple pool for storing divs. */
        private pool;
        /** This is a tick used to check if an object is no longer being rendered. */
        private renderId;
        /** The array of currently active accessible items. */
        private children;
        /** Count to throttle div updates on android devices. */
        private androidUpdateCount;
        /**  The frequency to update the div elements. */
        private androidUpdateFrequency;
        /**
         * @param {PIXI.CanvasRenderer|PIXI.Renderer} renderer - A reference to the current renderer
         */
        constructor(renderer: AbstractRenderer | Renderer);
        /**
         * Value of `true` if accessibility is currently active and accessibility layers are showing.
         * @member {boolean}
         * @readonly
         */
        get isActive(): boolean;
        /**
         * Value of `true` if accessibility is enabled for touch devices.
         * @member {boolean}
         * @readonly
         */
        get isMobileAccessibility(): boolean;
        /**
         * Creates the touch hooks.
         *
         * @private
         */
        private createTouchHook;
        /**
         * Destroys the touch hooks.
         *
         * @private
         */
        private destroyTouchHook;
        /**
         * Activating will cause the Accessibility layer to be shown.
         * This is called when a user presses the tab key.
         *
         * @private
         */
        private activate;
        /**
         * Deactivating will cause the Accessibility layer to be hidden.
         * This is called when a user moves the mouse.
         *
         * @private
         */
        private deactivate;
        /**
         * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
         *
         * @private
         * @param {PIXI.Container} displayObject - The DisplayObject to check.
         */
        private updateAccessibleObjects;
        /**
         * Before each render this function will ensure that all divs are mapped correctly to their DisplayObjects.
         *
         * @private
         */
        private update;
        /**
         * private function that will visually add the information to the
         * accessability div
         *
         * @param {HTMLElement} div
         */
        updateDebugHTML(div: IAccessibleHTMLElement): void;
        /**
         * Adjust the hit area based on the bounds of a display object
         *
         * @param {PIXI.Rectangle} hitArea - Bounds of the child
         */
        capHitArea(hitArea: Rectangle): void;
        /**
         * Adds a DisplayObject to the accessibility manager
         *
         * @private
         * @param {PIXI.DisplayObject} displayObject - The child to make accessible.
         */
        private addChild;
        /**
         * Maps the div button press to pixi's InteractionManager (click)
         *
         * @private
         * @param {MouseEvent} e - The click event.
         */
        private _onClick;
        /**
         * Maps the div focus events to pixi's InteractionManager (mouseover)
         *
         * @private
         * @param {FocusEvent} e - The focus event.
         */
        private _onFocus;
        /**
         * Maps the div focus events to pixi's InteractionManager (mouseout)
         *
         * @private
         * @param {FocusEvent} e - The focusout event.
         */
        private _onFocusOut;
        /**
         * Is called when a key is pressed
         *
         * @private
         * @param {KeyboardEvent} e - The keydown event.
         */
        private _onKeyDown;
        /**
         * Is called when the mouse moves across the renderer element
         *
         * @private
         * @param {MouseEvent} e - The mouse event.
         */
        private _onMouseMove;
        /**
         * Destroys the accessibility manager
         *
         */
        destroy(): void;
    }

    /**
     * Default property values of accessible objects
     * used by {@link PIXI.AccessibilityManager}.
     *
     * @private
     * @function accessibleTarget
     * @memberof PIXI
     * @type {Object}
     * @example
     *      function MyObject() {}
     *
     *      Object.assign(
     *          MyObject.prototype,
     *          PIXI.accessibleTarget
     *      );
     */
    export const accessibleTarget: IAccessibleTarget;

    export interface IAccessibleHTMLElement extends HTMLElement {
        type?: string;
        displayObject?: DisplayObject;
    }

    export interface IAccessibleTarget {
        accessible: boolean;
        accessibleTitle: string;
        accessibleHint: string;
        tabIndex: number;
        _accessibleActive: boolean;
        _accessibleDiv: IAccessibleHTMLElement;
        accessibleType: string;
        accessiblePointerEvents: PointerEvents;
        accessibleChildren: boolean;
        renderId: number;
    }

    export type PointerEvents = 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | 'inherit';

    //------------ global.d.ts
    namespace GlobalMixins {

    }
    /////////////////////////////////////////////////
    ////////////////app//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * Convenience class to create a new PIXI application.
     *
     * This class automatically creates the renderer, ticker and root container.
     *
     * @example
     * // Create the application
     * const app = new PIXI.Application();
     *
     * // Add the view to the DOM
     * document.body.appendChild(app.view);
     *
     * // ex, add display objects
     * app.stage.addChild(PIXI.Sprite.from('something.png'));
     *
     * @class
     * @memberof PIXI
     */
    export class Application {
        /** Collection of installed plugins. */
        private static _plugins;
        /**
         * The root display container that's rendered.
         * @member {PIXI.Container}
         */
        stage: Container;
        /**
         * WebGL renderer if available, otherwise CanvasRenderer.
         * @member {PIXI.Renderer|PIXI.CanvasRenderer}
         */
        renderer: Renderer | AbstractRenderer;
        /**
         * @param {object} [options] - The optional renderer parameters.
         * @param {boolean} [options.autoStart=true] - Automatically starts the rendering after the construction.
         *     **Note**: Setting this parameter to false does NOT stop the shared ticker even if you set
         *     options.sharedTicker to true in case that it is already started. Stop it by your own.
         * @param {number} [options.width=800] - The width of the renderers view.
         * @param {number} [options.height=600] - The height of the renderers view.
         * @param {HTMLCanvasElement} [options.view] - The canvas to use as a view, optional.
         * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
         *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
         *   canvas needs to be opaque, possibly for performance reasons on some older devices.
         * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
         *   resolutions other than 1.
         * @param {boolean} [options.antialias=false] - Sets antialias
         * @param {boolean} [options.preserveDrawingBuffer=false] - Enables drawing buffer preservation, enable this if you
         *  need to call toDataUrl on the WebGL context.
         * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the renderer.
         * @param {boolean} [options.forceCanvas=false] - prevents selection of WebGL renderer, even if such is present, this
         *   option only is available when using **pixi.js-legacy** or **@pixi/canvas-renderer** modules, otherwise
         *   it is ignored.
         * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
         *  (shown if not transparent).
         * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
         * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
         *   not before the new render pass.
         * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
         *  for devices with dual graphics card. **(WebGL only)**.
         * @param {boolean} [options.sharedTicker=false] - `true` to use PIXI.Ticker.shared, `false` to create new ticker.
         *  If set to false, you cannot register a handler to occur before anything that runs on the shared ticker.
         *  The system ticker will always run before both the shared ticker and the app ticker.
         * @param {boolean} [options.sharedLoader=false] - `true` to use PIXI.Loader.shared, `false` to create new Loader.
         * @param {Window|HTMLElement} [options.resizeTo] - Element to automatically resize stage to.
         */
        constructor(options?: IApplicationOptions);
        /**
         * Register a middleware plugin for the application
         * @static
         * @param {PIXI.IApplicationPlugin} plugin - Plugin being installed
         */
        static registerPlugin(plugin: IApplicationPlugin): void;
        /**
         * Render the current stage.
         */
        render(): void;
        /**
         * Reference to the renderer's canvas element.
         * @member {HTMLCanvasElement}
         * @readonly
         */
        get view(): HTMLCanvasElement;
        /**
         * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
         * @member {PIXI.Rectangle}
         * @readonly
         */
        get screen(): Rectangle;
        /**
         * Destroy and don't use after this.
         * @param {Boolean} [removeView=false] - Automatically remove canvas from DOM.
         * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
         *  method called as well. 'stageOptions' will be passed on to those calls.
         * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
         *  to true. Should it destroy the texture of the child sprite
         * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
         *  to true. Should it destroy the base texture of the child sprite
         */
        destroy(removeView?: boolean, stageOptions?: IDestroyOptions | boolean): void;
    }

    export interface IApplicationOptions extends IRendererOptionsAuto, GlobalMixins.IApplicationOptions {
    }

    /**
     * Any plugin that's usable for Application should contain these methods.
     * @memberof PIXI
     * @see {@link PIXI.Application.registerPlugin}
     */
    export interface IApplicationPlugin {
        /**
         * Called when Application is constructed, scoped to Application instance.
         * Passes in `options` as the only argument, which are Application constructor options.
         * @param {object} options - Application options.
         */
        init(options: IApplicationOptions): void;
        /**
         * Called when destroying Application, scoped to Application instance.
         */
        destroy(): void;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Application {
            resizeTo: Window | HTMLElement;
            resize(): void;
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface IApplicationOptions {
            resizeTo?: Window | HTMLElement;
        }
    }
    /////////////////////////////////////////////////
    ////////////////compressed-textures//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * Resource that fetches texture data over the network and stores it in a buffer.
     *
     * @class
     * @extends PIXI.Resource
     * @memberof PIXI
     */
    export abstract class BlobResource extends BufferResource {
        protected origin: string;
        protected buffer: ViewableBuffer;
        protected loaded: boolean;
        /**
         * @param {string} url - the URL of the texture file
         * @param {boolean}[autoLoad] - whether to fetch the data immediately;
         *  you can fetch it later via {@link BlobResource#load}
         */
        constructor(source: string | Uint8Array | Uint32Array | Float32Array, options?: IBlobOptions);
        protected onBlobLoaded(_data: ArrayBuffer): void;
        /**
         * Loads the blob
         */
        load(): Promise<Resource>;
    }

    /**
     * @ignore
     */
    export type CompressedLevelBuffer = {
        levelID: number;
        levelWidth: number;
        levelHeight: number;
        levelBuffer: Uint8Array;
    };

    export type CompressedTextureExtensionRef = keyof CompressedTextureExtensions;

    /**
     * Compressed texture extensions
     */
    export type CompressedTextureExtensions = {
        s3tc?: WEBGL_compressed_texture_s3tc;
        s3tc_sRGB: WEBGL_compressed_texture_s3tc_srgb;
        etc: any;
        etc1: any;
        pvrtc: any;
        atc: any;
        astc: WEBGL_compressed_texture_astc;
    };

    /**
     * Loader plugin for handling compressed textures for all platforms.
     *
     * @class
     * @memberof PIXI
     * @implements PIXI.ILoaderPlugin
     */
    export class CompressedTextureLoader {
        /**  Map of available texture extensions. */
        static textureExtensions: Partial<CompressedTextureExtensions>;
        /** Map of available texture formats. */
        static textureFormats: {
            [P in keyof INTERNAL_FORMATS]?: number;
        };
        /**
         * Called after a compressed-textures manifest is loaded.
         *
         * This will then load the correct compression format for the device. Your manifest should adhere
         * to the following schema:
         *
         * ```js
         *
         * type CompressedTextureManifest = {
         *  textures: Array<{ src: string, format?: keyof INTERNAL_FORMATS}>,
         *  cacheID: string;
         * };
         * ```
         *
         * This is an example of a .json manifest file
         *
         * ```json
         * {
         *   "cacheID":"asset",
         *   "textures":[
         *     { "src":"asset.fallback.png" },
         *     { "format":"COMPRESSED_RGBA_S3TC_DXT5_EXT", "src":"asset.s3tc.ktx" },
         *     { "format":"COMPRESSED_RGBA8_ETC2_EAC", "src":"asset.etc.ktx" },
         *     { "format":"RGBA_PVRTC_4BPPV1_IMG", "src":"asset.pvrtc.ktx" }
         *   ]
         * }
         * ```
         */
        static use(resource: LoaderResource, next: (...args: any[]) => void): void;
        /**
         * Detects the available compressed texture extensions on the device.
         * @ignore
         */
        static add(): void;
    }

    /**
     * Schema for compressed-texture manifests
     *
     * @ignore
     * @see PIXI.CompressedTextureLoader
     */
    export type CompressedTextureManifest = {
        textures: Array<{
            src: string;
            format?: keyof INTERNAL_FORMATS;
        }>;
        cacheID: string;
    };

    /**
     * Resource for compressed texture formats, as follows: S3TC/DXTn (& their sRGB formats), ATC, ASTC, ETC 1/2, PVRTC.
     *
     * Compressed textures improve performance when rendering is texture-bound. The texture data stays compressed in
     * graphics memory, increasing memory locality and speeding up texture fetches. These formats can also be used to store
     * more detail in the same amount of memory.
     *
     * For most developers, container file formats are a better abstraction instead of directly handling raw texture
     * data. PixiJS provides native support for the following texture file formats (via {@link PIXI.Loader}):
     *
     * * **.dds** - the DirectDraw Surface file format stores DXTn (DXT-1,3,5) data. See {@link PIXI.DDSLoader}
     * * **.ktx** - the Khronos Texture Container file format supports storing all the supported WebGL compression formats.
     *  See {@link PIXI.KTXLoader}.
     * * **.basis** - the BASIS supercompressed file format stores texture data in an internal format that is transcoded
     *  to the compression format supported on the device at _runtime_. It also supports transcoding into a uncompressed
     *  format as a fallback; you must install the `@pixi/basis-loader`, `@pixi/basis-transcoder` packages separately to
     *  use these files. See {@link PIXI.BasisLoader}.
     *
     * The loaders for the aforementioned formats use `CompressedTextureResource` internally. It is strongly suggested that
     * they be used instead.
     *
     * ## Working directly with CompressedTextureResource
     *
     * Since `CompressedTextureResource` inherits `BlobResource`, you can provide it a URL pointing to a file containing
     * the raw texture data (with no file headers!):
     *
     * ```js
     * // The resource backing the texture data for your textures.
     * // NOTE: You can also provide a ArrayBufferView instead of a URL. This is used when loading data from a container file
     * //   format such as KTX, DDS, or BASIS.
     * const compressedResource = new PIXI.CompressedTextureResource("bunny.dxt5", {
     *   format: PIXI.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT,
     *   width: 256,
     *   height: 256
     * });
     *
     * // You can create a base-texture to the cache, so that future `Texture`s can be created using the `Texture.from` API.
     * const baseTexture = new PIXI.BaseTexture(compressedResource, { pmaMode: PIXI.ALPHA_MODES.NPM });
     *
     * // Create a Texture to add to the TextureCache
     * const texture = new PIXI.Texture(baseTexture);
     *
     * // Add baseTexture & texture to the global texture cache
     * PIXI.BaseTexture.addToCache(baseTexture, "bunny.dxt5");
     * PIXI.Texture.addToCache(texture, "bunny.dxt5");
     * ```
     *
     * @memberof PIXI
     */
    export class CompressedTextureResource extends BlobResource {
        /** The compression format */
        format: INTERNAL_FORMATS;
        /**
         * The number of mipmap levels stored in the resource buffer.
         * @default 1
         */
        levels: number;
        private _extension;
        private _levelBuffers;
        /**
         * @param source - the buffer/URL holding the compressed texture data
         * @param options
         * @param {PIXI.INTERNAL_FORMATS} options.format - the compression format
         * @param {number} options.width - the image width in pixels.
         * @param {number} options.height - the image height in pixels.
         * @param {number} [options.level=1] - the mipmap levels stored in the compressed texture, including level 0.
         * @param {number} [options.levelBuffers] - the buffers for each mipmap level. `CompressedTextureResource` can allows you
         *      to pass `null` for `source`, for cases where each level is stored in non-contiguous memory.
         */
        constructor(source: string | Uint8Array | Uint32Array, options: ICompressedTextureResourceOptions);
        /**
         * @override
         * @param renderer - A reference to the current renderer
         * @param _texture - the texture
         * @param _glTexture - texture instance for this webgl context
         */
        upload(renderer: Renderer, _texture: BaseTexture, _glTexture: GLTexture): boolean;
        /** @protected */
        protected onBlobLoaded(): void;
        /**
         * Returns the key (to ContextSystem#extensions) for the WebGL extension supporting the compression format
         *
         * @private
         * @param format - the compression format to get the extension for.
         */
        private static _formatToExtension;
        /**
         * Pre-creates buffer views for each mipmap level
         *
         * @private
         * @param buffer -
         * @param format - compression formats
         * @param levels - mipmap levels
         * @param blockWidth -
         * @param blockHeight -
         * @param imageWidth - width of the image in pixels
         * @param imageHeight - height of the image in pixels
         */
        private static _createLevelBuffers;
    }

    /**
     * @class
     * @memberof PIXI
     * @implements PIXI.ILoaderPlugin
     * @see https://docs.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds-pguide
     */
    export class DDSLoader {
        /**
         * Registers a DDS compressed texture
         * @see PIXI.Loader.loaderMiddleware
         * @param resource - loader resource that is checked to see if it is a DDS file
         * @param next - callback Function to call when done
         */
        static use(resource: LoaderResource, next: (...args: any[]) => void): void;
        /** Parses the DDS file header, generates base-textures, and puts them into the texture cache. */
        private static parse;
    }

    /**
     * Number of components in each {@link PIXI.FORMATS}
     *
     * @ignore
     */
    export const FORMATS_TO_COMPONENTS: {
        [id: number]: number;
    };

    interface IBlobOptions {
        autoLoad?: boolean;
        width: number;
        height: number;
    }

    /**
     * @ignore
     */
    export interface ICompressedTextureResourceOptions {
        format: INTERNAL_FORMATS;
        width: number;
        height: number;
        levels?: number;
        levelBuffers?: CompressedLevelBuffer[];
    }

    /**
     * Maps the compressed texture formats in {@link PIXI.INTERNAL_FORMATS} to the number of bytes taken by
     * each texel.
     *
     * @memberof PIXI
     * @static
     * @ignore
     */
    export const INTERNAL_FORMAT_TO_BYTES_PER_PIXEL: {
        [id: number]: number;
    };

    /**
     * WebGL internal formats, including compressed texture formats provided by extensions
     *
     * @memberof PIXI
     * @static
     * @name INTERNAL_FORMATS
     * @enum {number}
     * @property {number} COMPRESSED_RGB_S3TC_DXT1_EXT=0x83F0
     * @property {number} COMPRESSED_RGBA_S3TC_DXT1_EXT=0x83F1
     * @property {number} COMPRESSED_RGBA_S3TC_DXT3_EXT=0x83F2
     * @property {number} COMPRESSED_RGBA_S3TC_DXT5_EXT=0x83F3
     * @property {number} COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT=35917
     * @property {number} COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT=35918
     * @property {number} COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT=35919
     * @property {number} COMPRESSED_SRGB_S3TC_DXT1_EXT=35916
     * @property {number} COMPRESSED_R11_EAC=0x9270
     * @property {number} COMPRESSED_SIGNED_R11_EAC=0x9271
     * @property {number} COMPRESSED_RG11_EAC=0x9272
     * @property {number} COMPRESSED_SIGNED_RG11_EAC=0x9273
     * @property {number} COMPRESSED_RGB8_ETC2=0x9274
     * @property {number} COMPRESSED_RGBA8_ETC2_EAC=0x9278
     * @property {number} COMPRESSED_SRGB8_ETC2=0x9275
     * @property {number} COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=0x9279
     * @property {number} COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=0x9276
     * @property {number} COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=0x9277
     * @property {number} COMPRESSED_RGB_PVRTC_4BPPV1_IMG=0x8C00
     * @property {number} COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=0x8C02
     * @property {number} COMPRESSED_RGB_PVRTC_2BPPV1_IMG=0x8C01
     * @property {number} COMPRESSED_RGBA_PVRTC_2BPPV1_IMG=0x8C03
     * @property {number} COMPRESSED_RGB_ETC1_WEBGL=0x8D64
     * @property {number} COMPRESSED_RGB_ATC_WEBGL=0x8C92
     * @property {number} COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL=0x8C92
     * @property {number} COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL=0x87EE
     */
    export enum INTERNAL_FORMATS {
        COMPRESSED_RGB_S3TC_DXT1_EXT = 33776,
        COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777,
        COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778,
        COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779,
        COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917,
        COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918,
        COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919,
        COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916,
        COMPRESSED_R11_EAC = 37488,
        COMPRESSED_SIGNED_R11_EAC = 37489,
        COMPRESSED_RG11_EAC = 37490,
        COMPRESSED_SIGNED_RG11_EAC = 37491,
        COMPRESSED_RGB8_ETC2 = 37492,
        COMPRESSED_RGBA8_ETC2_EAC = 37496,
        COMPRESSED_SRGB8_ETC2 = 37493,
        COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497,
        COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494,
        COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495,
        COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840,
        COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842,
        COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841,
        COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843,
        COMPRESSED_RGB_ETC1_WEBGL = 36196,
        COMPRESSED_RGB_ATC_WEBGL = 35986,
        COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986,
        COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798
    }

    /**
     * Loader plugin for handling KTX texture container files.
     *
     * This KTX loader does not currently support the following features:
     * * cube textures
     * * 3D textures
     * * vendor-specific key/value data parsing
     * * endianness conversion for big-endian machines
     * * embedded *.basis files
     *
     * It does supports the following features:
     * * multiple textures per file
     * * mipmapping
     *
     * @class
     * @memberof PIXI
     * @implements PIXI.ILoaderPlugin
     */
    export class KTXLoader {
        /**
         * Called after a KTX file is loaded.
         *
         * This will parse the KTX file header and add a {@code BaseTexture} to the texture
         * cache.
         *
         * @see PIXI.Loader.loaderMiddleware
         * @param resource - loader resource that is checked to see if it is a KTX file
         * @param next - callback Function to call when done
         */
        static use(resource: LoaderResource, next: (...args: any[]) => void): void;
        /** Parses the KTX file header, generates base-textures, and puts them into the texture cache. */
        private static parse;
        /** Checks whether the arrayBuffer contains a valid *.ktx file. */
        private static validate;
    }

    /**
     * Maps {@link PIXI.TYPES} to the bytes taken per component, excluding those ones that are bit-fields.
     *
     * @ignore
     */
    export const TYPES_TO_BYTES_PER_COMPONENT: {
        [id: number]: number;
    };

    /**
     * Number of bytes per pixel in bit-field types in {@link PIXI.TYPES}
     *
     * @ignore
     */
    export const TYPES_TO_BYTES_PER_PIXEL: {
        [id: number]: number;
    };

    /////////////////////////////////////////////////
    ////////////////constants//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * How to treat textures with premultiplied alpha
     *
     * @name ALPHA_MODES
     * @memberof PIXI
     * @static
     * @enum {number}
     * @property {number} NO_PREMULTIPLIED_ALPHA - Source is not premultiplied, leave it like that.
     *  Option for compressed and data textures that are created from typed arrays.
     * @property {number} PREMULTIPLY_ON_UPLOAD - Source is not premultiplied, premultiply on upload.
     *  Default option, used for all loaded images.
     * @property {number} PREMULTIPLIED_ALPHA - Source is already premultiplied
     *  Example: spine atlases with `_pma` suffix.
     * @property {number} NPM - Alias for NO_PREMULTIPLIED_ALPHA.
     * @property {number} UNPACK - Default option, alias for PREMULTIPLY_ON_UPLOAD.
     * @property {number} PMA - Alias for PREMULTIPLIED_ALPHA.
     */
    export enum ALPHA_MODES {
        NPM = 0,
        UNPACK = 1,
        PMA = 2,
        NO_PREMULTIPLIED_ALPHA = 0,
        PREMULTIPLY_ON_UPLOAD = 1,
        PREMULTIPLY_ALPHA = 2,
        PREMULTIPLIED_ALPHA = 2
    }

    /**
     * Various blend modes supported by PIXI.
     *
     * IMPORTANT - The WebGL renderer only supports the NORMAL, ADD, MULTIPLY and SCREEN blend modes.
     * Anything else will silently act like NORMAL.
     *
     * @memberof PIXI
     * @name BLEND_MODES
     * @enum {number}
     * @property {number} NORMAL
     * @property {number} ADD
     * @property {number} MULTIPLY
     * @property {number} SCREEN
     * @property {number} OVERLAY
     * @property {number} DARKEN
     * @property {number} LIGHTEN
     * @property {number} COLOR_DODGE
     * @property {number} COLOR_BURN
     * @property {number} HARD_LIGHT
     * @property {number} SOFT_LIGHT
     * @property {number} DIFFERENCE
     * @property {number} EXCLUSION
     * @property {number} HUE
     * @property {number} SATURATION
     * @property {number} COLOR
     * @property {number} LUMINOSITY
     * @property {number} NORMAL_NPM
     * @property {number} ADD_NPM
     * @property {number} SCREEN_NPM
     * @property {number} NONE
     * @property {number} SRC_IN
     * @property {number} SRC_OUT
     * @property {number} SRC_ATOP
     * @property {number} DST_OVER
     * @property {number} DST_IN
     * @property {number} DST_OUT
     * @property {number} DST_ATOP
     * @property {number} SUBTRACT
     * @property {number} SRC_OVER
     * @property {number} ERASE
     * @property {number} XOR
     */
    export enum BLEND_MODES {
        NORMAL = 0,
        ADD = 1,
        MULTIPLY = 2,
        SCREEN = 3,
        OVERLAY = 4,
        DARKEN = 5,
        LIGHTEN = 6,
        COLOR_DODGE = 7,
        COLOR_BURN = 8,
        HARD_LIGHT = 9,
        SOFT_LIGHT = 10,
        DIFFERENCE = 11,
        EXCLUSION = 12,
        HUE = 13,
        SATURATION = 14,
        COLOR = 15,
        LUMINOSITY = 16,
        NORMAL_NPM = 17,
        ADD_NPM = 18,
        SCREEN_NPM = 19,
        NONE = 20,
        SRC_OVER = 0,
        SRC_IN = 21,
        SRC_OUT = 22,
        SRC_ATOP = 23,
        DST_OVER = 24,
        DST_IN = 25,
        DST_OUT = 26,
        DST_ATOP = 27,
        ERASE = 26,
        SUBTRACT = 28,
        XOR = 29
    }

    /**
     * Bitwise OR of masks that indicate the buffers to be cleared.
     *
     * @static
     * @memberof PIXI
     * @name BUFFER_BITS
     * @enum {number}
     * @property {number} COLOR - Indicates the buffers currently enabled for color writing.
     * @property {number} DEPTH - Indicates the depth buffer.
     * @property {number} STENCIL - Indicates the stencil buffer.
     */
    export enum BUFFER_BITS {
        COLOR = 16384,
        DEPTH = 256,
        STENCIL = 1024
    }

    /**
     * Constants for various buffer types in Pixi
     *
     * @see PIXI.BUFFER_TYPE
     *
     * @name BUFFER_TYPE
     * @memberof PIXI
     * @static
     * @enum {number}
     * @property {number} ELEMENT_ARRAY_BUFFER - buffer type for using as an index buffer
     * @property {number} ARRAY_BUFFER - buffer type for using attribute data
     * @property {number} UNIFORM_BUFFER - the buffer type is for uniform buffer objects
     */
    export enum BUFFER_TYPE {
        ELEMENT_ARRAY_BUFFER = 34963,
        ARRAY_BUFFER = 34962,
        UNIFORM_BUFFER = 35345
    }

    /**
     * Configure whether filter textures are cleared after binding.
     *
     * Filter textures need not be cleared if the filter does not use pixel blending. {@link CLEAR_MODES.BLIT} will detect
     * this and skip clearing as an optimization.
     *
     * @name CLEAR_MODES
     * @memberof PIXI
     * @static
     * @enum {number}
     * @property {number} BLEND - Do not clear the filter texture. The filter's output will blend on top of the output texture.
     * @property {number} CLEAR - Always clear the filter texture.
     * @property {number} BLIT - Clear only if {@link FilterSystem.forceClear} is set or if the filter uses pixel blending.
     * @property {number} NO - Alias for BLEND, same as `false` in earlier versions
     * @property {number} YES - Alias for CLEAR, same as `true` in earlier versions
     * @property {number} AUTO - Alias for BLIT
     */
    export enum CLEAR_MODES {
        NO = 0,
        YES = 1,
        AUTO = 2,
        BLEND = 0,
        CLEAR = 1,
        BLIT = 2
    }

    /**
     * Various webgl draw modes. These can be used to specify which GL drawMode to use
     * under certain situations and renderers.
     *
     * @memberof PIXI
     * @static
     * @name DRAW_MODES
     * @enum {number}
     * @property {number} POINTS
     * @property {number} LINES
     * @property {number} LINE_LOOP
     * @property {number} LINE_STRIP
     * @property {number} TRIANGLES
     * @property {number} TRIANGLE_STRIP
     * @property {number} TRIANGLE_FAN
     */
    export enum DRAW_MODES {
        POINTS = 0,
        LINES = 1,
        LINE_LOOP = 2,
        LINE_STRIP = 3,
        TRIANGLES = 4,
        TRIANGLE_STRIP = 5,
        TRIANGLE_FAN = 6
    }

    /**
     * Different types of environments for WebGL.
     *
     * @static
     * @memberof PIXI
     * @name ENV
     * @enum {number}
     * @property {number} WEBGL_LEGACY - Used for older v1 WebGL devices. PixiJS will aim to ensure compatibility
     *  with older / less advanced devices. If you experience unexplained flickering prefer this environment.
     * @property {number} WEBGL - Version 1 of WebGL
     * @property {number} WEBGL2 - Version 2 of WebGL
     */
    export enum ENV {
        WEBGL_LEGACY = 0,
        WEBGL = 1,
        WEBGL2 = 2
    }

    /**
     * Various GL texture/resources formats.
     *
     * @memberof PIXI
     * @static
     * @name FORMATS
     * @enum {number}
     * @property {number} RGBA=6408
     * @property {number} RGB=6407
     * @property {number} RG=33319
     * @property {number} RED=6403
     * @property {number} RGBA_INTEGER=36249
     * @property {number} RGB_INTEGER=36248
     * @property {number} RG_INTEGER=33320
     * @property {number} RED_INTEGER=36244
     * @property {number} ALPHA=6406
     * @property {number} LUMINANCE=6409
     * @property {number} LUMINANCE_ALPHA=6410
     * @property {number} DEPTH_COMPONENT=6402
     * @property {number} DEPTH_STENCIL=34041
     */
    export enum FORMATS {
        RGBA = 6408,
        RGB = 6407,
        RG = 33319,
        RED = 6403,
        RGBA_INTEGER = 36249,
        RGB_INTEGER = 36248,
        RG_INTEGER = 33320,
        RED_INTEGER = 36244,
        ALPHA = 6406,
        LUMINANCE = 6409,
        LUMINANCE_ALPHA = 6410,
        DEPTH_COMPONENT = 6402,
        DEPTH_STENCIL = 34041
    }

    /**
     * The gc modes that are supported by pixi.
     *
     * The {@link PIXI.settings.GC_MODE} Garbage Collection mode for PixiJS textures is AUTO
     * If set to GC_MODE, the renderer will occasionally check textures usage. If they are not
     * used for a specified period of time they will be removed from the GPU. They will of course
     * be uploaded again when they are required. This is a silent behind the scenes process that
     * should ensure that the GPU does not  get filled up.
     *
     * Handy for mobile devices!
     * This property only affects WebGL.
     *
     * @name GC_MODES
     * @enum {number}
     * @static
     * @memberof PIXI
     * @property {number} AUTO - Garbage collection will happen periodically automatically
     * @property {number} MANUAL - Garbage collection will need to be called manually
     */
    export enum GC_MODES {
        AUTO = 0,
        MANUAL = 1
    }

    /**
     * Constants for mask implementations.
     * We use `type` suffix because it leads to very different behaviours
     *
     * @name MASK_TYPES
     * @memberof PIXI
     * @static
     * @enum {number}
     * @property {number} NONE - Mask is ignored
     * @property {number} SCISSOR - Scissor mask, rectangle on screen, cheap
     * @property {number} STENCIL - Stencil mask, 1-bit, medium, works only if renderer supports stencil
     * @property {number} SPRITE - Mask that uses SpriteMaskFilter, uses temporary RenderTexture
     */
    export enum MASK_TYPES {
        NONE = 0,
        SCISSOR = 1,
        STENCIL = 2,
        SPRITE = 3
    }

    /**
     * Mipmap filtering modes that are supported by pixi.
     *
     * The {@link PIXI.settings.MIPMAP_TEXTURES} affects default texture filtering.
     * Mipmaps are generated for a baseTexture if its `mipmap` field is `ON`,
     * or its `POW2` and texture dimensions are powers of 2.
     * Due to platform restriction, `ON` option will work like `POW2` for webgl-1.
     *
     * This property only affects WebGL.
     *
     * @name MIPMAP_MODES
     * @memberof PIXI
     * @static
     * @enum {number}
     * @property {number} OFF - No mipmaps
     * @property {number} POW2 - Generate mipmaps if texture dimensions are pow2
     * @property {number} ON - Always generate mipmaps
     * @property {number} ON_MANUAL - Use mipmaps, but do not auto-generate them; this is used with a resource
     *   that supports buffering each level-of-detail.
     */
    export enum MIPMAP_MODES {
        OFF = 0,
        POW2 = 1,
        ON = 2,
        ON_MANUAL = 3
    }

    /**
     * Constants for multi-sampling antialiasing.
     *
     * @see PIXI.Framebuffer#multisample
     *
     * @name MSAA_QUALITY
     * @memberof PIXI
     * @static
     * @enum {number}
     * @property {number} NONE - No multisampling for this renderTexture
     * @property {number} LOW - Try 2 samples
     * @property {number} MEDIUM - Try 4 samples
     * @property {number} HIGH - Try 8 samples
     */
    export enum MSAA_QUALITY {
        NONE = 0,
        LOW = 2,
        MEDIUM = 4,
        HIGH = 8
    }

    /**
     * Constants that specify float precision in shaders.
     *
     * @name PRECISION
     * @memberof PIXI
     * @constant
     * @static
     * @enum {string}
     * @property {string} LOW='lowp'
     * @property {string} MEDIUM='mediump'
     * @property {string} HIGH='highp'
     */
    export enum PRECISION {
        LOW = "lowp",
        MEDIUM = "mediump",
        HIGH = "highp"
    }

    /**
     * Constant to identify the Renderer Type.
     *
     * @static
     * @memberof PIXI
     * @name RENDERER_TYPE
     * @enum {number}
     * @property {number} UNKNOWN - Unknown render type.
     * @property {number} WEBGL - WebGL render type.
     * @property {number} CANVAS - Canvas render type.
     */
    export enum RENDERER_TYPE {
        UNKNOWN = 0,
        WEBGL = 1,
        CANVAS = 2
    }

    /**
     * Various sampler types. Correspond to `sampler`, `isampler`, `usampler` GLSL types respectively.
     * WebGL1 works only with FLOAT.
     *
     * @memberof PIXI
     * @static
     * @name SAMPLER_TYPES
     * @enum {number}
     * @property {number} FLOAT=0
     * @property {number} INT=1
     * @property {number} UINT=2
     */
    export enum SAMPLER_TYPES {
        FLOAT = 0,
        INT = 1,
        UINT = 2
    }

    /**
     * The scale modes that are supported by pixi.
     *
     * The {@link PIXI.settings.SCALE_MODE} scale mode affects the default scaling mode of future operations.
     * It can be re-assigned to either LINEAR or NEAREST, depending upon suitability.
     *
     * @memberof PIXI
     * @static
     * @name SCALE_MODES
     * @enum {number}
     * @property {number} LINEAR Smooth scaling
     * @property {number} NEAREST Pixelating scaling
     */
    export enum SCALE_MODES {
        NEAREST = 0,
        LINEAR = 1
    }

    /**
     * Various GL target types.
     *
     * @memberof PIXI
     * @static
     * @name TARGETS
     * @enum {number}
     * @property {number} TEXTURE_2D=3553
     * @property {number} TEXTURE_CUBE_MAP=34067
     * @property {number} TEXTURE_2D_ARRAY=35866
     * @property {number} TEXTURE_CUBE_MAP_POSITIVE_X=34069
     * @property {number} TEXTURE_CUBE_MAP_NEGATIVE_X=34070
     * @property {number} TEXTURE_CUBE_MAP_POSITIVE_Y=34071
     * @property {number} TEXTURE_CUBE_MAP_NEGATIVE_Y=34072
     * @property {number} TEXTURE_CUBE_MAP_POSITIVE_Z=34073
     * @property {number} TEXTURE_CUBE_MAP_NEGATIVE_Z=34074
     */
    export enum TARGETS {
        TEXTURE_2D = 3553,
        TEXTURE_CUBE_MAP = 34067,
        TEXTURE_2D_ARRAY = 35866,
        TEXTURE_CUBE_MAP_POSITIVE_X = 34069,
        TEXTURE_CUBE_MAP_NEGATIVE_X = 34070,
        TEXTURE_CUBE_MAP_POSITIVE_Y = 34071,
        TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072,
        TEXTURE_CUBE_MAP_POSITIVE_Z = 34073,
        TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074
    }

    /**
     * Various GL data format types.
     *
     * @memberof PIXI
     * @static
     * @name TYPES
     * @enum {number}
     * @property {number} UNSIGNED_BYTE=5121
     * @property {number} UNSIGNED_SHORT=5123
     * @property {number} UNSIGNED_SHORT_5_6_5=33635
     * @property {number} UNSIGNED_SHORT_4_4_4_4=32819
     * @property {number} UNSIGNED_SHORT_5_5_5_1=32820
     * @property {number} UNSIGNED_INT=5125
     * @property {number} UNSIGNED_INT_10F_11F_11F_REV=35899
     * @property {number} UNSIGNED_INT_2_10_10_10_REV=33640
     * @property {number} UNSIGNED_INT_24_8=34042
     * @property {number} UNSIGNED_INT_5_9_9_9_REV=35902
     * @property {number} BYTE=5120
     * @property {number} SHORT=5122
     * @property {number} INT=5124
     * @property {number} FLOAT=5126
     * @property {number} FLOAT_32_UNSIGNED_INT_24_8_REV=36269
     * @property {number} HALF_FLOAT=36193
     */
    export enum TYPES {
        UNSIGNED_BYTE = 5121,
        UNSIGNED_SHORT = 5123,
        UNSIGNED_SHORT_5_6_5 = 33635,
        UNSIGNED_SHORT_4_4_4_4 = 32819,
        UNSIGNED_SHORT_5_5_5_1 = 32820,
        UNSIGNED_INT = 5125,
        UNSIGNED_INT_10F_11F_11F_REV = 35899,
        UNSIGNED_INT_2_10_10_10_REV = 33640,
        UNSIGNED_INT_24_8 = 34042,
        UNSIGNED_INT_5_9_9_9_REV = 35902,
        BYTE = 5120,
        SHORT = 5122,
        INT = 5124,
        FLOAT = 5126,
        FLOAT_32_UNSIGNED_INT_24_8_REV = 36269,
        HALF_FLOAT = 36193
    }

    /**
     * The wrap modes that are supported by pixi.
     *
     * The {@link PIXI.settings.WRAP_MODE} wrap mode affects the default wrapping mode of future operations.
     * It can be re-assigned to either CLAMP or REPEAT, depending upon suitability.
     * If the texture is non power of two then clamp will be used regardless as WebGL can
     * only use REPEAT if the texture is po2.
     *
     * This property only affects WebGL.
     *
     * @name WRAP_MODES
     * @memberof PIXI
     * @static
     * @enum {number}
     * @property {number} CLAMP - The textures uvs are clamped
     * @property {number} REPEAT - The texture uvs tile and repeat
     * @property {number} MIRRORED_REPEAT - The texture uvs tile and repeat with mirroring
     */
    export enum WRAP_MODES {
        CLAMP = 33071,
        REPEAT = 10497,
        MIRRORED_REPEAT = 33648
    }

    /////////////////////////////////////////////////
    ////////////////core//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * Renderer dedicated to drawing and batching sprites.
     *
     * This is the default batch renderer. It buffers objects
     * with texture-based geometries and renders them in
     * batches. It uploads multiple textures to the GPU to
     * reduce to the number of draw calls.
     *
     * @memberof PIXI
     */
    export class AbstractBatchRenderer extends ObjectRenderer {
        /** The WebGL state in which this renderer will work. */
        readonly state: State;
        /**
         * The number of bufferable objects before a flush
         * occurs automatically.
         *
         * @default settings.SPRITE_BATCH_SIZE * 4
         */
        size: number;
        /**
         * Maximum number of textures that can be uploaded to
         * the GPU under the current context. It is initialized
         * properly in `this.contextChange`.
         *
         * @see PIXI.AbstractBatchRenderer#contextChange
         * @readonly
         */
        MAX_TEXTURES: number;
        /**
         * This is used to generate a shader that can
         * color each vertex based on a `aTextureId`
         * attribute that points to an texture in `uSampler`.
         *
         * This enables the objects with different textures
         * to be drawn in the same draw call.
         *
         * You can customize your shader by creating your
         * custom shader generator.
         */
        protected shaderGenerator: BatchShaderGenerator;
        /**
         * The class that represents the geometry of objects
         * that are going to be batched with this.
         *
         * @member {object}
         * @default PIXI.BatchGeometry
         */
        protected geometryClass: typeof BatchGeometry;
        /**
         * Size of data being buffered per vertex in the
         * attribute buffers (in floats). By default, the
         * batch-renderer plugin uses 6:
         *
         * | aVertexPosition | 2 |
         * |-----------------|---|
         * | aTextureCoords  | 2 |
         * | aColor          | 1 |
         * | aTextureId      | 1 |
         *
         * @readonly
         */
        protected vertexSize: number;
        /** Total count of all vertices used by the currently buffered objects. */
        protected _vertexCount: number;
        /** Total count of all indices used by the currently buffered objects. */
        protected _indexCount: number;
        /**
         * Buffer of objects that are yet to be rendered.
         *
         * @member {PIXI.DisplayObject[]}
         */
        protected _bufferedElements: Array<IBatchableElement>;
        /**
         * Data for texture batch builder, helps to save a bit of CPU on a pass.
         *
         * @member {PIXI.BaseTexture[]}
         */
        protected _bufferedTextures: Array<BaseTexture>;
        /** Number of elements that are buffered and are waiting to be flushed. */
        protected _bufferSize: number;
        /**
         * This shader is generated by `this.shaderGenerator`.
         *
         * It is generated specifically to handle the required
         * number of textures being batched together.
         */
        protected _shader: Shader;
        /**
         * A flush may occur multiple times in a single
         * frame. On iOS devices or when
         * `settings.CAN_UPLOAD_SAME_BUFFER` is false, the
         * batch renderer does not upload data to the same
         * `WebGLBuffer` for performance reasons.
         *
         * This is the index into `packedGeometries` that points to
         * geometry holding the most recent buffers.
         */
        protected _flushId: number;
        /**
         * Pool of `ViewableBuffer` objects that are sorted in
         * order of increasing size. The flush method uses
         * the buffer with the least size above the amount
         * it requires. These are used for passing attributes.
         *
         * The first buffer has a size of 8; each subsequent
         * buffer has double capacity of its previous.
         *
         * @member {PIXI.ViewableBuffer[]}
         * @see PIXI.AbstractBatchRenderer#getAttributeBuffer
         */
        protected _aBuffers: Array<ViewableBuffer>;
        /**
         * Pool of `Uint16Array` objects that are sorted in
         * order of increasing size. The flush method uses
         * the buffer with the least size above the amount
         * it requires. These are used for passing indices.
         *
         * The first buffer has a size of 12; each subsequent
         * buffer has double capacity of its previous.
         *
         * @member {Uint16Array[]}
         * @see PIXI.AbstractBatchRenderer#getIndexBuffer
         */
        protected _iBuffers: Array<Uint16Array>;
        protected _dcIndex: number;
        protected _aIndex: number;
        protected _iIndex: number;
        protected _attributeBuffer: ViewableBuffer;
        protected _indexBuffer: Uint16Array;
        protected _tempBoundTextures: BaseTexture[];
        /**
         * Pool of `this.geometryClass` geometry objects
         * that store buffers. They are used to pass data
         * to the shader on each draw call.
         *
         * These are never re-allocated again, unless a
         * context change occurs; however, the pool may
         * be expanded if required.
         *
         * @member {PIXI.Geometry[]}
         * @see PIXI.AbstractBatchRenderer.contextChange
         */
        private _packedGeometries;
        /**
         * Size of `this._packedGeometries`. It can be expanded
         * if more than `this._packedGeometryPoolSize` flushes
         * occur in a single frame.
         */
        private _packedGeometryPoolSize;
        /**
         * This will hook onto the renderer's `contextChange`
         * and `prerender` signals.
         *
         * @param {PIXI.Renderer} renderer - The renderer this works for.
         */
        constructor(renderer: Renderer);
        /**
         * Handles the `contextChange` signal.
         *
         * It calculates `this.MAX_TEXTURES` and allocating the packed-geometry object pool.
         */
        contextChange(): void;
        /** Makes sure that static and dynamic flush pooled objects have correct dimensions. */
        initFlushBuffers(): void;
        /**
         * Handles the `prerender` signal.
         *
         * It ensures that flushes start from the first geometry object again.
         */
        onPrerender(): void;
        /**
         * Buffers the "batchable" object. It need not be rendered immediately.
         *
         * @param {PIXI.DisplayObject} element - the element to render when
         *    using this renderer
         */
        render(element: IBatchableElement): void;
        buildTexturesAndDrawCalls(): void;
        /** Populating drawcalls for rendering */
        buildDrawCalls(texArray: BatchTextureArray, start: number, finish: number): void;
        /** Bind textures for current rendering */
        bindAndClearTexArray(texArray: BatchTextureArray): void;
        updateGeometry(): void;
        drawBatches(): void;
        /** Renders the content _now_ and empties the current batch. */
        flush(): void;
        /** Starts a new sprite batch. */
        start(): void;
        /** Stops and flushes the current batch. */
        stop(): void;
        /** Destroys this `AbstractBatchRenderer`. It cannot be used again. */
        destroy(): void;
        /**
         * Fetches an attribute buffer from `this._aBuffers` that can hold atleast `size` floats.
         *
         * @param size - minimum capacity required
         * @return - buffer than can hold atleast `size` floats
         */
        getAttributeBuffer(size: number): ViewableBuffer;
        /**
         * Fetches an index buffer from `this._iBuffers` that can
         * have at least `size` capacity.
         *
         * @param size - minimum required capacity
         * @return - buffer that can fit `size` indices.
         */
        getIndexBuffer(size: number): Uint16Array;
        /**
         * Takes the four batching parameters of `element`, interleaves
         * and pushes them into the batching attribute/index buffers given.
         *
         * It uses these properties: `vertexData` `uvs`, `textureId` and
         * `indicies`. It also uses the "tint" of the base-texture, if
         * present.
         *
         * @param {PIXI.DisplayObject} element - element being rendered
         * @param attributeBuffer - attribute buffer.
         * @param indexBuffer - index buffer
         * @param aIndex - number of floats already in the attribute buffer
         * @param iIndex - number of indices already in `indexBuffer`
         */
        packInterleavedGeometry(element: IBatchableElement, attributeBuffer: ViewableBuffer, indexBuffer: Uint16Array, aIndex: number, iIndex: number): void;
        /**
         * Pool of `BatchDrawCall` objects that `flush` used
         * to create "batches" of the objects being rendered.
         *
         * These are never re-allocated again.
         * Shared between all batch renderers because it can be only one "flush" working at the moment.
         *
         * @member {PIXI.BatchDrawCall[]}
         */
        static _drawCallPool: Array<BatchDrawCall>;
        /**
         * Pool of `BatchDrawCall` objects that `flush` used
         * to create "batches" of the objects being rendered.
         *
         * These are never re-allocated again.
         * Shared between all batch renderers because it can be only one "flush" working at the moment.
         *
         * @member {PIXI.BatchTextureArray[]}
         */
        static _textureArrayPool: Array<BatchTextureArray>;
    }

    /**
     * System plugin to the renderer to manage specific types of masking operations.
     *
     * @memberof PIXI
     */
    class AbstractMaskSystem implements ISystem {
        /**
         * The mask stack
         * @member {PIXI.MaskData[]}
         */
        protected maskStack: Array<MaskData>;
        /**
         * Constant for gl.enable
         * @private
         */
        protected glConst: number;
        protected renderer: Renderer;
        /**
         * @param renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /** Gets count of masks of certain type. */
        getStackLength(): number;
        /**
         * Changes the mask stack that is used by this System.
         *
         * @param {PIXI.MaskData[]} maskStack - The mask stack
         */
        setMaskStack(maskStack: Array<MaskData>): void;
        /**
         * Setup renderer to use the current mask data.
         * @private
         */
        protected _useCurrent(): void;
        /** Destroys the mask stack. */
        destroy(): void;
    }

    /**
     * Resource that can manage several resource (items) inside.
     * All resources need to have the same pixel size.
     * Parent class for CubeResource and ArrayResource
     *
     * @memberof PIXI
     */
    export abstract class AbstractMultiResource extends Resource {
        /** Number of elements in array. */
        readonly length: number;
        /**
         * Collection of partial baseTextures that correspond to resources.
         *
         * @readonly
         */
        items: Array<BaseTexture>;
        /**
         * Dirty IDs for each part.
         *
         * @readonly
         */
        itemDirtyIds: Array<number>;
        /**
         * Promise when loading.
         *
         * @default null
         */
        private _load;
        /** Bound baseTexture, there can only be one. */
        baseTexture: BaseTexture;
        /**
         * @param length
         * @param options - Options to for Resource constructor
         * @param {number} [options.width] - Width of the resource
         * @param {number} [options.height] - Height of the resource
         */
        constructor(length: number, options?: ISize);
        /**
         * Used from ArrayResource and CubeResource constructors.
         *
         * @param resources - Can be resources, image elements, canvas, etc. ,
         *  length should be same as constructor length
         * @param options - Detect options for resources
         */
        protected initFromArray(resources: Array<any>, options?: IAutoDetectOptions): void;
        /** Destroy this BaseImageResource. */
        dispose(): void;
        /**
         * Set a baseTexture by ID
         *
         * @param baseTexture
         * @param index - Zero-based index of resource to set
         * @return - Instance for chaining
         */
        abstract addBaseTextureAt(baseTexture: BaseTexture, index: number): this;
        /**
         * Set a resource by ID
         *
         * @param resource
         * @param index - Zero-based index of resource to set
         * @return - Instance for chaining
         */
        addResourceAt(resource: Resource, index: number): this;
        /** Set the parent base texture. */
        bind(baseTexture: BaseTexture): void;
        /** Unset the parent base texture. */
        unbind(baseTexture: BaseTexture): void;
        /**
         * Load all the resources simultaneously
         *
         * @return - When load is resolved
         */
        load(): Promise<this>;
    }

    /**
     * The AbstractRenderer is the base for a PixiJS Renderer. It is extended by the {@link PIXI.CanvasRenderer}
     * and {@link PIXI.Renderer} which can be used for rendering a PixiJS scene.
     *
     * @abstract
     * @class
     * @extends PIXI.utils.EventEmitter
     * @memberof PIXI
     */
    export abstract class AbstractRenderer extends PIXI.utils.EventEmitter {
        resolution: number;
        clearBeforeRender?: boolean;
        readonly options: IRendererOptions;
        readonly type: RENDERER_TYPE;
        readonly screen: Rectangle;
        readonly view: HTMLCanvasElement;
        readonly plugins: IRendererPlugins;
        readonly useContextAlpha: boolean | 'notMultiplied';
        readonly autoDensity: boolean;
        readonly preserveDrawingBuffer: boolean;
        protected _backgroundColor: number;
        protected _backgroundColorString: string;
        _backgroundColorRgba: number[];
        _lastObjectRendered: IRenderableObject;
        /**
         * @param system - The name of the system this renderer is for.
         * @param [options] - The optional renderer parameters.
         * @param {number} [options.width=800] - The width of the screen.
         * @param {number} [options.height=600] - The height of the screen.
         * @param {HTMLCanvasElement} [options.view] - The canvas to use as a view, optional.
         * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
         *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
         *   canvas needs to be opaque, possibly for performance reasons on some older devices.
         * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
         *   resolutions other than 1.
         * @param {boolean} [options.antialias=false] - Sets antialias
         * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the renderer.
         * @param {boolean} [options.preserveDrawingBuffer=false] - Enables drawing buffer preservation,
         *  enable this if you need to call toDataUrl on the WebGL context.
         * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
         *      not before the new render pass.
         * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
         *  (shown if not transparent).
         * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
         */
        constructor(type?: RENDERER_TYPE, options?: IRendererOptions);
        /**
         * Initialize the plugins.
         *
         * @protected
         * @param {object} staticMap - The dictionary of statically saved plugins.
         */
        initPlugins(staticMap: IRendererPlugins): void;
        /**
         * Same as view.width, actual number of pixels in the canvas by horizontal.
         *
         * @member {number}
         * @readonly
         * @default 800
         */
        get width(): number;
        /**
         * Same as view.height, actual number of pixels in the canvas by vertical.
         *
         * @member {number}
         * @readonly
         * @default 600
         */
        get height(): number;
        /**
         * Resizes the screen and canvas as close as possible to the specified width and height.
         * Canvas dimensions are multiplied by resolution and rounded to the nearest integers.
         * The new canvas dimensions divided by the resolution become the new screen dimensions.
         *
         * @param desiredScreenWidth - The desired width of the screen.
         * @param desiredScreenHeight - The desired height of the screen.
         */
        resize(desiredScreenWidth: number, desiredScreenHeight: number): void;
        /**
         * Useful function that returns a texture of the display object that can then be used to create sprites
         * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
         * @method PIXI.AbstractRenderer#generateTexture
         * @param displayObject - The displayObject the object will be generated from.
         * @param {object} options - Generate texture options.
         * @param {PIXI.SCALE_MODES} options.scaleMode - The scale mode of the texture.
         * @param {number} options.resolution - The resolution / device pixel ratio of the texture being generated.
         * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
         *        if no region is specified, defaults to the local bounds of the displayObject.
         * @param {PIXI.MSAA_QUALITY} options.multisample - The number of samples of the frame buffer.
         * @return A texture of the graphics object.
         */
        generateTexture(displayObject: IRenderableObject, options?: IGenerateTextureOptions): RenderTexture;
        /**
         * Please use the options argument instead.
         *
         * @method PIXI.AbstractRenderer#generateTexture
         * @deprecated Since 6.1.0
         * @param displayObject - The displayObject the object will be generated from.
         * @param scaleMode - The scale mode of the texture.
         * @param resolution - The resolution / device pixel ratio of the texture being generated.
         * @param region - The region of the displayObject, that shall be rendered,
         *        if no region is specified, defaults to the local bounds of the displayObject.
         * @return A texture of the graphics object.
         */
        generateTexture(displayObject: IRenderableObject, scaleMode?: SCALE_MODES, resolution?: number, region?: Rectangle): RenderTexture;
        abstract render(displayObject: IRenderableObject, options?: IRendererRenderOptions): void;
        /**
         * Removes everything from the renderer and optionally removes the Canvas DOM element.
         *
         * @param [removeView=false] - Removes the Canvas element from the DOM.
         */
        destroy(removeView?: boolean): void;
        /**
         * The background color to fill if not transparent
         *
         * @member {number}
         */
        get backgroundColor(): number;
        set backgroundColor(value: number);
        /**
         * The background color alpha. Setting this to 0 will make the canvas transparent.
         *
         * @member {number}
         */
        get backgroundAlpha(): number;
        set backgroundAlpha(value: number);
    }

    /**
     * A resource that contains a number of sources.
     *
     * @memberof PIXI
     */
    export class ArrayResource extends AbstractMultiResource {
        /**
         * @param source - Number of items in array or the collection
         *        of image URLs to use. Can also be resources, image elements, canvas, etc.
         * @param options - Options to apply to {@link PIXI.autoDetectResource}
         * @param {number} [options.width] - Width of the resource
         * @param {number} [options.height] - Height of the resource
         */
        constructor(source: number | Array<any>, options?: ISize);
        /**
         * Set a baseTexture by ID,
         * ArrayResource just takes resource from it, nothing more
         *
         * @param baseTexture
         * @param index - Zero-based index of resource to set
         * @return - Instance for chaining
         */
        addBaseTextureAt(baseTexture: BaseTexture, index: number): this;
        /** Add binding */
        bind(baseTexture: BaseTexture): void;
        /**
         * Upload the resources to the GPU.
         *
         * @param renderer
         * @param texture
         * @param glTexture
         * @returns - whether texture was uploaded
         */
        upload(renderer: Renderer, texture: BaseTexture, glTexture: GLTexture): boolean;
    }

    /**
     * Holds the information for a single attribute structure required to render geometry.
     *
     * This does not contain the actual data, but instead has a buffer id that maps to a {@link PIXI.Buffer}
     * This can include anything from positions, uvs, normals, colors etc.
     *
     * @memberof PIXI
     */
    export class Attribute {
        buffer: number;
        size: number;
        normalized: boolean;
        type: TYPES;
        stride: number;
        start: number;
        instance: boolean;
        /**
         * @param buffer - the id of the buffer that this attribute will look for
         * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2.
         * @param normalized - should the data be normalized.
         * @param {PIXI.TYPES} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
         * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
         * @param [start=0] - How far into the array to start reading values (used for interleaving data)
         * @param [instance=false] - Whether the geometry is instanced.
         */
        constructor(buffer: number, size?: number, normalized?: boolean, type?: TYPES, stride?: number, start?: number, instance?: boolean);
        /** Destroys the Attribute. */
        destroy(): void;
        /**
         * Helper function that creates an Attribute based on the information provided
         *
         * @param buffer - the id of the buffer that this attribute will look for
         * @param [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
         * @param [normalized=false] - should the data be normalized.
         * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
         * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
         * @returns - A new {@link PIXI.Attribute} based on the information provided
         */
        static from(buffer: number, size?: number, normalized?: boolean, type?: TYPES, stride?: number): Attribute;
    }

    /**
     * This helper function will automatically detect which renderer you should be using.
     * WebGL is the preferred renderer as it is a lot faster. If WebGL is not supported by
     * the browser then this function will return a canvas renderer
     *
     * @memberof PIXI
     * @function autoDetectRenderer
     * @param {object} [options] - The optional renderer parameters
     * @param {number} [options.width=800] - the width of the renderers view
     * @param {number} [options.height=600] - the height of the renderers view
     * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
     * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
     *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
     *   canvas needs to be opaque, possibly for performance reasons on some older devices.
     * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
     *   resolutions other than 1
     * @param {boolean} [options.antialias=false] - sets antialias
     * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation, enable this if you
     *  need to call toDataUrl on the webgl context
     * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
     *  (shown if not transparent).
     * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
     * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
     *   not before the new render pass.
     * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the renderer.
     * @param {boolean} [options.forceCanvas=false] - prevents selection of WebGL renderer, even if such is present, this
     *   option only is available when using **pixi.js-legacy** or **@pixi/canvas-renderer** modules, otherwise
     *   it is ignored.
     * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
     *  for devices with dual graphics card **webgl only**
     * @return {PIXI.Renderer|PIXI.CanvasRenderer} Returns WebGL renderer if available, otherwise CanvasRenderer
     */
    export function autoDetectRenderer(options?: IRendererOptionsAuto): AbstractRenderer;

    /**
     * Create a resource element from a single source element. This
     * auto-detects which type of resource to create. All resources that
     * are auto-detectable must have a static `test` method and a constructor
     * with the arguments `(source, options?)`. Currently, the supported
     * resources for auto-detection include:
     *  - {@link PIXI.ImageResource}
     *  - {@link PIXI.CanvasResource}
     *  - {@link PIXI.VideoResource}
     *  - {@link PIXI.SVGResource}
     *  - {@link PIXI.BufferResource}
     * @static
     * @memberof PIXI
     * @function autoDetectResource
     * @param {string|*} source - Resource source, this can be the URL to the resource,
     *        a typed-array (for BufferResource), HTMLVideoElement, SVG data-uri
     *        or any other resource that can be auto-detected. If not resource is
     *        detected, it's assumed to be an ImageResource.
     * @param {object} [options] - Pass-through options to use for Resource
     * @param {number} [options.width] - Width of BufferResource or SVG rasterization
     * @param {number} [options.height] - Height of BufferResource or SVG rasterization
     * @param {boolean} [options.autoLoad=true] - Image, SVG and Video flag to start loading
     * @param {number} [options.scale=1] - SVG source scale. Overridden by width, height
     * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - Image option to create Bitmap object
     * @param {boolean} [options.crossorigin=true] - Image and Video option to set crossOrigin
     * @param {boolean} [options.autoPlay=true] - Video option to start playing video immediately
     * @param {number} [options.updateFPS=0] - Video option to update how many times a second the
     *        texture should be updated from the video. Leave at 0 to update at every render
     * @return {PIXI.Resource} The created resource.
     */
    export function autoDetectResource<R extends Resource, RO>(source: unknown, options?: RO): R;

    /**
     * Base for all the image/canvas resources.
     *
     * @memberof PIXI
     */
    export class BaseImageResource extends Resource {
        /**
         * The source element.
         *
         * @member {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|SVGElement}
         * @readonly
         */
        source: ImageSource;
        /**
         * If set to `true`, will force `texImage2D` over `texSubImage2D` for uploading.
         * Certain types of media (e.g. video) using `texImage2D` is more performant.
         *
         * @default false
         * @private
         */
        noSubImage: boolean;
        /**
         * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|SVGElement} source
         */
        constructor(source: ImageSource);
        /**
         * Set cross origin based detecting the url and the crossorigin
         *
         * @param element - Element to apply crossOrigin
         * @param url - URL to check
         * @param crossorigin - Cross origin value to use
         */
        static crossOrigin(element: HTMLImageElement | HTMLVideoElement, url: string, crossorigin?: boolean | string): void;
        /**
         * Upload the texture to the GPU.
         *
         * @param renderer - Upload to the renderer
         * @param baseTexture - Reference to parent texture
         * @param glTexture
         * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|SVGElement} [source] - (optional)
         * @returns - true is success
         */
        upload(renderer: Renderer, baseTexture: BaseTexture, glTexture: GLTexture, source?: ImageSource): boolean;
        /**
         * Checks if source width/height was changed, resize can cause extra baseTexture update.
         * Triggers one update in any case.
         */
        update(): void;
        /** Destroy this {@link BaseImageResource} */
        dispose(): void;
    }

    export interface BaseRenderTexture extends GlobalMixins.BaseRenderTexture, BaseTexture {
    }

    /**
     * A BaseRenderTexture is a special texture that allows any PixiJS display object to be rendered to it.
     *
     * __Hint__: All DisplayObjects (i.e. Sprites) that render to a BaseRenderTexture should be preloaded
     * otherwise black rectangles will be drawn instead.
     *
     * A BaseRenderTexture takes a snapshot of any Display Object given to its render method. The position
     * and rotation of the given Display Objects is ignored. For example:
     *
     * ```js
     * let renderer = PIXI.autoDetectRenderer();
     * let baseRenderTexture = new PIXI.BaseRenderTexture({ width: 800, height: 600 });
     * let renderTexture = new PIXI.RenderTexture(baseRenderTexture);
     * let sprite = PIXI.Sprite.from("spinObj_01.png");
     *
     * sprite.position.x = 800/2;
     * sprite.position.y = 600/2;
     * sprite.anchor.x = 0.5;
     * sprite.anchor.y = 0.5;
     *
     * renderer.render(sprite, {renderTexture});
     * ```
     *
     * The Sprite in this case will be rendered using its local transform. To render this sprite at 0,0
     * you can clear the transform
     *
     * ```js
     *
     * sprite.setTransform()
     *
     * let baseRenderTexture = new PIXI.BaseRenderTexture({ width: 100, height: 100 });
     * let renderTexture = new PIXI.RenderTexture(baseRenderTexture);
     *
     * renderer.render(sprite, {renderTexture});  // Renders to center of RenderTexture
     * ```
     *
     * @class
     * @extends PIXI.BaseTexture
     * @memberof PIXI
     */
    export class BaseRenderTexture extends BaseTexture {
        clearColor: number[];
        framebuffer: Framebuffer;
        maskStack: Array<MaskData>;
        filterStack: Array<any>;
        /**
         * @param {object} [options]
         * @param {number} [options.width=100] - The width of the base render texture.
         * @param {number} [options.height=100] - The height of the base render texture.
         * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES}
         *   for possible values.
         * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio
         *   of the texture being generated.
         * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer.
         */
        constructor(options?: IBaseTextureOptions);
        /**
         * Resizes the BaseRenderTexture.
         *
         * @param {number} desiredWidth - The desired width to resize to.
         * @param {number} desiredHeight - The desired height to resize to.
         */
        resize(desiredWidth: number, desiredHeight: number): void;
        /**
         * Frees the texture and framebuffer from WebGL memory without destroying this texture object.
         * This means you can still use the texture later which will upload it to GPU
         * memory again.
         *
         * @fires PIXI.BaseTexture#dispose
         */
        dispose(): void;
        /**
         * Destroys this texture.
         */
        destroy(): void;
    }

    export interface BaseTexture extends GlobalMixins.BaseTexture, PIXI.utils.EventEmitter {
    }

    /**
     * A Texture stores the information that represents an image.
     * All textures have a base texture, which contains information about the source.
     * Therefore you can have many textures all using a single BaseTexture
     *
     * @class
     * @extends PIXI.utils.EventEmitter
     * @memberof PIXI
     * @typeParam R - The BaseTexture's Resource type.
     * @typeParam RO - The options for constructing resource.
     */
    export class BaseTexture<R extends Resource = Resource, RO = IAutoDetectOptions> extends PIXI.utils.EventEmitter {
        /**
         * The width of the base texture set when the image has loaded
         *
         * @readonly
         */
        width: number;
        /**
         * The height of the base texture set when the image has loaded
         *
         * @readonly
         */
        height: number;
        /**
         * The resolution / device pixel ratio of the texture
         *
         * @readonly
         * @default PIXI.settings.RESOLUTION
         */
        resolution: number;
        /**
         * How to treat premultiplied alpha, see {@link PIXI.ALPHA_MODES}.
         *
         * @member {PIXI.ALPHA_MODES}
         * @default PIXI.ALPHA_MODES.UNPACK
         */
        alphaMode?: ALPHA_MODES;
        /**
         * Anisotropic filtering level of texture
         *
         * @member {number}
         * @default PIXI.settings.ANISOTROPIC_LEVEL
         */
        anisotropicLevel?: number;
        /**
         * The pixel format of the texture
         *
         * @default PIXI.FORMATS.RGBA
         */
        format?: FORMATS;
        /**
         * The type of resource data
         *
         * @default PIXI.TYPES.UNSIGNED_BYTE
         */
        type?: TYPES;
        /**
         * The target type
         *
         * @default PIXI.TARGETS.TEXTURE_2D
         */
        target?: TARGETS;
        /**
         * Global unique identifier for this BaseTexture
         *
         * @protected
         */
        readonly uid: number;
        /**
         * Used by automatic texture Garbage Collection, stores last GC tick when it was bound
         *
         * @protected
         */
        touched: number;
        /**
         * Whether or not the texture is a power of two, try to use power of two textures as much
         * as you can
         *
         * @readonly
         * @default false
         */
        isPowerOfTwo: boolean;
        /**
         * The map of render context textures where this is bound
         *
         * @private
         */
        _glTextures: {
            [key: number]: GLTexture;
        };
        /**
         * Used by TextureSystem to only update texture to the GPU when needed.
         * Please call `update()` to increment it.
         *
         * @readonly
         */
        dirtyId: number;
        /**
         * Used by TextureSystem to only update texture style when needed.
         *
         * @protected
         */
        dirtyStyleId: number;
        /**
         * Currently default cache ID.
         *
         * @member {string}
         */
        cacheId: string;
        /**
         * Generally speaking means when resource is loaded.
         * @readonly
         * @member {boolean}
         */
        valid: boolean;
        /**
         * The collection of alternative cache ids, since some BaseTextures
         * can have more than one ID, short name and longer full URL
         *
         * @member {Array<string>}
         * @readonly
         */
        textureCacheIds: Array<string>;
        /**
         * Flag if BaseTexture has been destroyed.
         *
         * @member {boolean}
         * @readonly
         */
        destroyed: boolean;
        /**
         * The resource used by this BaseTexture, there can only
         * be one resource per BaseTexture, but textures can share
         * resources.
         *
         * @member {PIXI.Resource}
         * @readonly
         */
        resource: R;
        /**
         * Number of the texture batch, used by multi-texture renderers
         *
         * @member {number}
         */
        _batchEnabled: number;
        /**
         * Location inside texture batch, used by multi-texture renderers
         *
         * @member {number}
         */
        _batchLocation: number;
        /**
         * Whether its a part of another texture, handled by ArrayResource or CubeResource
         *
         * @member {PIXI.BaseTexture}
         */
        parentTextureArray: BaseTexture;
        private _mipmap?;
        private _scaleMode?;
        private _wrapMode?;
        /**
         * @param {PIXI.Resource|string|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} [resource=null] -
         *        The current resource to use, for things that aren't Resource objects, will be converted
         *        into a Resource.
         * @param {Object} [options] - Collection of options
         * @param {PIXI.MIPMAP_MODES} [options.mipmap=PIXI.settings.MIPMAP_TEXTURES] - If mipmapping is enabled for texture
         * @param {number} [options.anisotropicLevel=PIXI.settings.ANISOTROPIC_LEVEL] - Anisotropic filtering level of texture
         * @param {PIXI.WRAP_MODES} [options.wrapMode=PIXI.settings.WRAP_MODE] - Wrap mode for textures
         * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.settings.SCALE_MODE] - Default scale mode, linear, nearest
         * @param {PIXI.FORMATS} [options.format=PIXI.FORMATS.RGBA] - GL format type
         * @param {PIXI.TYPES} [options.type=PIXI.TYPES.UNSIGNED_BYTE] - GL data type
         * @param {PIXI.TARGETS} [options.target=PIXI.TARGETS.TEXTURE_2D] - GL texture target
         * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Pre multiply the image alpha
         * @param {number} [options.width=0] - Width of the texture
         * @param {number} [options.height=0] - Height of the texture
         * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - Resolution of the base texture
         * @param {object} [options.resourceOptions] - Optional resource options,
         *        see {@link PIXI.autoDetectResource autoDetectResource}
         */
        constructor(resource?: R | ImageSource | string | any, options?: IBaseTextureOptions<RO>);
        /**
         * Pixel width of the source of this texture
         *
         * @readonly
         * @member {number}
         */
        get realWidth(): number;
        /**
         * Pixel height of the source of this texture
         *
         * @readonly
         * @member {number}
         */
        get realHeight(): number;
        /**
         * Mipmap mode of the texture, affects downscaled images
         *
         * @member {PIXI.MIPMAP_MODES}
         * @default PIXI.settings.MIPMAP_TEXTURES
         */
        get mipmap(): MIPMAP_MODES;
        set mipmap(value: MIPMAP_MODES);
        /**
         * The scale mode to apply when scaling this texture
         *
         * @member {PIXI.SCALE_MODES}
         * @default PIXI.settings.SCALE_MODE
         */
        get scaleMode(): SCALE_MODES;
        set scaleMode(value: SCALE_MODES);
        /**
         * How the texture wraps
         * @member {PIXI.WRAP_MODES}
         * @default PIXI.settings.WRAP_MODE
         */
        get wrapMode(): WRAP_MODES;
        set wrapMode(value: WRAP_MODES);
        /**
         * Changes style options of BaseTexture
         *
         * @param {PIXI.SCALE_MODES} [scaleMode] - Pixi scalemode
         * @param {PIXI.MIPMAP_MODES} [mipmap] - enable mipmaps
         * @returns {PIXI.BaseTexture} this
         */
        setStyle(scaleMode?: SCALE_MODES, mipmap?: MIPMAP_MODES): this;
        /**
         * Changes w/h/resolution. Texture becomes valid if width and height are greater than zero.
         *
         * @param {number} desiredWidth - Desired visual width
         * @param {number} desiredHeight - Desired visual height
         * @param {number} [resolution] - Optionally set resolution
         * @returns {PIXI.BaseTexture} this
         */
        setSize(desiredWidth: number, desiredHeight: number, resolution?: number): this;
        /**
         * Sets real size of baseTexture, preserves current resolution.
         *
         * @param {number} realWidth - Full rendered width
         * @param {number} realHeight - Full rendered height
         * @param {number} [resolution] - Optionally set resolution
         * @returns {PIXI.BaseTexture} this
         */
        setRealSize(realWidth: number, realHeight: number, resolution?: number): this;
        /**
         * Refresh check for isPowerOfTwo texture based on size
         *
         * @private
         */
        protected _refreshPOT(): void;
        /**
         * Changes resolution
         *
         * @param {number} resolution - res
         * @returns {PIXI.BaseTexture} this
         */
        setResolution(resolution: number): this;
        /**
         * Sets the resource if it wasn't set. Throws error if resource already present
         *
         * @param {PIXI.Resource} resource - that is managing this BaseTexture
         * @returns {PIXI.BaseTexture} this
         */
        setResource(resource: R): this;
        /**
         * Invalidates the object. Texture becomes valid if width and height are greater than zero.
         */
        update(): void;
        /**
         * Handle errors with resources.
         * @private
         * @param {ErrorEvent} event - Error event emitted.
         */
        onError(event: ErrorEvent): void;
        /**
         * Destroys this base texture.
         * The method stops if resource doesn't want this texture to be destroyed.
         * Removes texture from all caches.
         */
        destroy(): void;
        /**
         * Frees the texture from WebGL memory without destroying this texture object.
         * This means you can still use the texture later which will upload it to GPU
         * memory again.
         *
         * @fires PIXI.BaseTexture#dispose
         */
        dispose(): void;
        /**
         * Utility function for BaseTexture|Texture cast
         */
        castToBaseTexture(): BaseTexture;
        /**
         * Helper function that creates a base texture based on the source you provide.
         * The source can be - image url, image element, canvas element. If the
         * source is an image url or an image element and not in the base texture
         * cache, it will be created and loaded.
         *
         * @static
         * @param {string|HTMLImageElement|HTMLCanvasElement|SVGElement|HTMLVideoElement} source - The
         *        source to create base texture from.
         * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
         * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
         * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
         * @returns {PIXI.BaseTexture} The new base texture.
         */
        static from<R extends Resource = Resource, RO = IAutoDetectOptions>(source: ImageSource | string, options?: IBaseTextureOptions<RO>, strict?: boolean): BaseTexture<R>;
        /**
         * Create a new BaseTexture with a BufferResource from a Float32Array.
         * RGBA values are floats from 0 to 1.
         * @static
         * @param {Float32Array|Uint8Array} buffer - The optional array to use, if no data
         *        is provided, a new Float32Array is created.
         * @param {number} width - Width of the resource
         * @param {number} height - Height of the resource
         * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
         * @return {PIXI.BaseTexture} The resulting new BaseTexture
         */
        static fromBuffer(buffer: Float32Array | Uint8Array, width: number, height: number, options?: IBaseTextureOptions): BaseTexture<BufferResource>;
        /**
         * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
         *
         * @static
         * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
         * @param {string} id - The id that the BaseTexture will be stored against.
         */
        static addToCache(baseTexture: BaseTexture, id: string): void;
        /**
         * Remove a BaseTexture from the global BaseTextureCache.
         *
         * @static
         * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
         * @return {PIXI.BaseTexture|null} The BaseTexture that was removed.
         */
        static removeFromCache(baseTexture: string | BaseTexture): BaseTexture | null;
        /**
         * Global number of the texture batch, used by multi-texture renderers
         *
         * @static
         * @member {number}
         */
        static _globalBatch: number;
    }

    /**
     * Used by the batcher to draw batches.
     * Each one of these contains all information required to draw a bound geometry.
     *
     * @memberof PIXI
     */
    export class BatchDrawCall {
        texArray: BatchTextureArray;
        type: DRAW_MODES;
        blend: BLEND_MODES;
        start: number;
        size: number;
        /** Data for uniforms or custom webgl state. */
        data: any;
        constructor();
    }

    /**
     * Geometry used to batch standard PIXI content (e.g. Mesh, Sprite, Graphics objects).
     *
     * @memberof PIXI
     */
    export class BatchGeometry extends Geometry {
        /**
         * Buffer used for position, color, texture IDs
         *
         * @protected
         */
        _buffer: Buffer_2;
        /**
         * Index buffer data
         *
         * @protected
         */
        _indexBuffer: Buffer_2;
        /**
         * @param {boolean} [_static=false] - Optimization flag, where `false`
         *        is updated every frame, `true` doesn't change frame-to-frame.
         */
        constructor(_static?: boolean);
    }

    /** @memberof PIXI */
    export class BatchPluginFactory {
        /**
         * Create a new BatchRenderer plugin for Renderer. this convenience can provide an easy way
         * to extend BatchRenderer with all the necessary pieces.
         * @example
         * const fragment = `
         * varying vec2 vTextureCoord;
         * varying vec4 vColor;
         * varying float vTextureId;
         * uniform sampler2D uSamplers[%count%];
         *
         * void main(void){
         *     vec4 color;
         *     %forloop%
         *     gl_FragColor = vColor * vec4(color.a - color.rgb, color.a);
         * }
         * `;
         * const InvertBatchRenderer = PIXI.BatchPluginFactory.create({ fragment });
         * PIXI.Renderer.registerPlugin('invert', InvertBatchRenderer);
         * const sprite = new PIXI.Sprite();
         * sprite.pluginName = 'invert';
         *
         * @param {object} [options]
         * @param {string} [options.vertex=PIXI.BatchPluginFactory.defaultVertexSrc] - Vertex shader source
         * @param {string} [options.fragment=PIXI.BatchPluginFactory.defaultFragmentTemplate] - Fragment shader template
         * @param {number} [options.vertexSize=6] - Vertex size
         * @param {object} [options.geometryClass=PIXI.BatchGeometry]
         * @return {*} New batch renderer plugin
         */
        static create(options?: IBatchFactoryOptions): typeof AbstractBatchRenderer;
        /**
         * The default vertex shader source
         *
         * @readonly
         */
        static get defaultVertexSrc(): string;
        /**
         * The default fragment shader source
         *
         * @readonly
         */
        static get defaultFragmentTemplate(): string;
    }

    export const BatchRenderer: typeof AbstractBatchRenderer;

    /**
     * Helper that generates batching multi-texture shader. Use it with your new BatchRenderer
     *
     * @memberof PIXI
     */
    export class BatchShaderGenerator {
        /** Reference to the vertex shader source. */
        vertexSrc: string;
        /** Reference to the fragment shader template. Must contain "%count%" and "%forloop%". */
        fragTemplate: string;
        programCache: {
            [key: number]: Program;
        };
        defaultGroupCache: {
            [key: number]: UniformGroup;
        };
        /**
         * @param vertexSrc - Vertex shader
         * @param fragTemplate - Fragment shader template
         */
        constructor(vertexSrc: string, fragTemplate: string);
        generateShader(maxTextures: number): Shader;
        generateSampleSrc(maxTextures: number): string;
    }

    /**
     * System plugin to the renderer to manage batching.
     *
     * @memberof PIXI
     */
    export class BatchSystem implements ISystem {
        /** An empty renderer. */
        readonly emptyRenderer: ObjectRenderer;
        /** The currently active ObjectRenderer. */
        currentRenderer: ObjectRenderer;
        private renderer;
        /**
         * @param renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * Changes the current renderer to the one given in parameter
         *
         * @param objectRenderer - The object renderer to use.
         */
        setObjectRenderer(objectRenderer: ObjectRenderer): void;
        /**
         * This should be called if you wish to do some custom rendering
         * It will basically render anything that may be batched up such as sprites
         */
        flush(): void;
        /**
         * Reset the system to an empty renderer
         */
        reset(): void;
        /**
         * Handy function for batch renderers: copies bound textures in first maxTextures locations to array
         * sets actual _batchLocation for them
         *
         * @param arr - arr copy destination
         * @param maxTextures - number of copied elements
         */
        copyBoundTextures(arr: BaseTexture[], maxTextures: number): void;
        /**
         * Assigns batch locations to textures in array based on boundTextures state.
         * All textures in texArray should have `_batchEnabled = _batchId`,
         * and their count should be less than `maxTextures`.
         *
         * @param texArray - textures to bound
         * @param boundTextures - current state of bound textures
         * @param batchId - marker for _batchEnabled param of textures in texArray
         * @param maxTextures - number of texture locations to manipulate
         */
        boundArray(texArray: BatchTextureArray, boundTextures: Array<BaseTexture>, batchId: number, maxTextures: number): void;
        /**
         * @ignore
         */
        destroy(): void;
    }

    /**
     * Used by the batcher to build texture batches.
     * Holds list of textures and their respective locations.
     *
     * @memberof PIXI
     */
    export class BatchTextureArray {
        /** Inside textures array. */
        elements: any[];
        /** Respective locations for textures. */
        ids: number[];
        /** Number of filled elements. */
        count: number;
        constructor();
        clear(): void;
    }

    /**
     * A wrapper for data so that it can be used and uploaded by WebGL
     *
     * @memberof PIXI
     */
    class Buffer_2 {
        /**
         * The data in the buffer, as a typed array
         *
         * @type {ArrayBuffer| SharedArrayBuffer | ArrayBufferView}
         */
        data: ITypedArray;
        /**
         * The type of buffer this is, one of:
         * + ELEMENT_ARRAY_BUFFER - used as an index buffer
         * + ARRAY_BUFFER - used as an attribute buffer
         * + UNIFORM_BUFFER - used as a uniform buffer (if available)
         */
        type: BUFFER_TYPE;
        static: boolean;
        id: number;
        disposeRunner: Runner;
        /**
         * A map of renderer IDs to webgl buffer
         *
         * @private
         * @type {object<number, GLBuffer>}
         */
        _glBuffers: {
            [key: number]: GLBuffer;
        };
        _updateID: number;
        /**
         * @param {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} data - the data to store in the buffer.
         * @param _static - `true` for static buffer
         * @param index - `true` for index buffer
         */
        constructor(data?: IArrayBuffer, _static?: boolean, index?: boolean);
        /**
         * Flags this buffer as requiring an upload to the GPU.
         * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|number[]} [data] - the data to update in the buffer.
         */
        update(data?: IArrayBuffer | Array<number>): void;
        /** Disposes WebGL resources that are connected to this geometry. */
        dispose(): void;
        /** Destroys the buffer. */
        destroy(): void;
        /**
         * Flags whether this is an index buffer.
         *
         * Index buffers are of type `ELEMENT_ARRAY_BUFFER`. Note that setting this property to false will make
         * the buffer of type `ARRAY_BUFFER`.
         *
         * For backwards compatibility.
         */
        set index(value: boolean);
        get index(): boolean;
        /**
         * Helper function that creates a buffer based on an array or TypedArray
         *
         * @param {ArrayBufferView | number[]} data - the TypedArray that the buffer will store. If this is a regular Array it will be converted to a Float32Array.
         * @return - A new Buffer based on the data provided.
         */
        static from(data: IArrayBuffer | number[]): Buffer_2;
    }
    export { Buffer_2 as Buffer }

    /**
     * @interface SharedArrayBuffer
     */
    /**
     * Buffer resource with data of typed array.
     *
     * @memberof PIXI
     */
    export class BufferResource extends Resource {
        /**
         * Source array
         * Cannot be {@code ClampedUint8Array} because it cant be uploaded to WebGL
         */
        data: Float32Array | Uint8Array | Uint16Array | Uint32Array;
        /**
         * @param source - Source buffer
         * @param options - Options
         * @param {number} options.width - Width of the texture
         * @param {number} options.height - Height of the texture
         */
        constructor(source: Float32Array | Uint8Array | Uint16Array | Uint32Array, options: ISize);
        /**
         * Upload the texture to the GPU.
         *
         * @param renderer - Upload to the renderer
         * @param baseTexture - Reference to parent texture
         * @param glTexture - glTexture
         * @returns - true is success
         */
        upload(renderer: Renderer, baseTexture: BaseTexture, glTexture: GLTexture): boolean;
        /** Destroy and don't use after this. */
        dispose(): void;
        /**
         * Used to auto-detect the type of resource.
         *
         * @param {*} source - The source object
         * @return {boolean} `true` if <canvas>
         */
        static test(source: unknown): source is Float32Array | Uint8Array | Uint32Array;
    }

    /**
     * System plugin to the renderer to manage buffers.
     *
     * WebGL uses Buffers as a way to store objects to the GPU.
     * This system makes working with them a lot easier.
     *
     * Buffers are used in three main places in WebGL
     * - geometry information
     * - Uniform information (via uniform buffer objects - a WebGL 2 only feature)
     * - Transform feedback information. (WebGL 2 only feature)
     *
     * This system will handle the binding of buffers to the GPU as well as uploading
     * them. With this system, you never need to work directly with GPU buffers, but instead work with
     * the PIXI.Buffer class.
     *
     *
     * @class
     * @memberof PIXI
     */
    class BufferSystem implements ISystem {
        CONTEXT_UID: number;
        gl: IRenderingContext;
        /** Cache for all buffers by id, used in case renderer gets destroyed or for profiling */
        readonly managedBuffers: {
            [key: number]: Buffer_2;
        };
        /** Cache keeping track of the base bound buffer bases */
        readonly boundBufferBases: {
            [key: number]: Buffer_2;
        };
        private renderer;
        /**
         * @param {PIXI.Renderer} renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * @ignore
         */
        destroy(): void;
        /**
         * Sets up the renderer context and necessary buffers.
         */
        protected contextChange(): void;
        /**
         * This binds specified buffer. On first run, it will create the webGL buffers for the context too
         *
         * @param buffer - the buffer to bind to the renderer
         */
        bind(buffer: Buffer_2): void;
        /**
         * Binds an uniform buffer to at the given index.
         *
         * A cache is used so a buffer will not be bound again if already bound.
         *
         * @param buffer - the buffer to bind
         * @param index - the base index to bind it to.
         */
        bindBufferBase(buffer: Buffer_2, index: number): void;
        /**
         * Binds a buffer whilst also binding its range.
         * This will make the buffer start from the offset supplied rather than 0 when it is read.
         *
         * @param buffer - the buffer to bind
         * @param index - the base index to bind at, defaults to 0
         * @param offset - the offset to bind at (this is blocks of 256). 0 = 0, 1 = 256, 2 = 512 etc
         */
        bindBufferRange(buffer: Buffer_2, index?: number, offset?: number): void;
        /**
         * Will ensure sure the the data in the buffer is uploaded to the GPU.
         *
         * @param {PIXI.Buffer} buffer - the buffer to update
         */
        update(buffer: Buffer_2): void;
        /**
         * Disposes buffer
         * @param {PIXI.Buffer} buffer - buffer with data
         * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
         */
        dispose(buffer: Buffer_2, contextLost?: boolean): void;
        /**
         * dispose all WebGL resources of all managed buffers
         * @param {boolean} [contextLost=false] - If context was lost, we suppress `gl.delete` calls
         */
        disposeAll(contextLost?: boolean): void;
        /**
         * creates and attaches a GLBuffer object tied to the current context.
         * @protected
         */
        protected createGLBuffer(buffer: Buffer_2): GLBuffer;
    }

    /**
     * @interface any
     */
    /**
     * Resource type for HTMLCanvasElement.
     *
     * @memberof PIXI
     */
    export class CanvasResource extends BaseImageResource {
        /**
         * @param source - Canvas element to use
         */
        constructor(source: HTMLCanvasElement);
        /**
         * Used to auto-detect the type of resource.
         *
         * @param {*} source - The source object
         * @return {boolean} `true` if source is HTMLCanvasElement or any
         */
        static test(source: unknown): source is any | HTMLCanvasElement;
    }

    export function checkMaxIfStatementsInShader(maxIfs: number, gl: IRenderingContext): number;

    /**
     * System plugin to the renderer to manage the context.
     *
     * @memberof PIXI
     */
    export class ContextSystem implements ISystem {
        /**
         * Either 1 or 2 to reflect the WebGL version being used.
         *
         * @readonly
         */
        webGLVersion: number;
        /**
         * Features supported by current context.
         *
         * @type {object}
         * @readonly
         * @property {boolean} uint32Indices - Support for 32-bit indices buffer.
         */
        readonly supports: ISupportDict;
        protected CONTEXT_UID: number;
        protected gl: IRenderingContext;
        /**
         * Extensions available.
         *
         * @type {object}
         * @readonly
         * @property {WEBGL_draw_buffers} drawBuffers - WebGL v1 extension
         * @property {WEBGL_depth_texture} depthTexture - WebGL v1 extension
         * @property {OES_texture_float} floatTexture - WebGL v1 extension
         * @property {WEBGL_lose_context} loseContext - WebGL v1 extension
         * @property {OES_vertex_array_object} vertexArrayObject - WebGL v1 extension
         * @property {EXT_texture_filter_anisotropic} anisotropicFiltering - WebGL v1 and v2 extension
         */
        extensions: WebGLExtensions;
        private renderer;
        /** @param renderer - The renderer this System works for. */
        constructor(renderer: Renderer);
        /**
         * `true` if the context is lost
         *
         * @readonly
         */
        get isLost(): boolean;
        /**
         * Handles the context change event.
         *
         * @param {WebGLRenderingContext} gl - New WebGL context.
         */
        protected contextChange(gl: IRenderingContext): void;
        /**
         * Initializes the context.
         *
         * @protected
         * @param {WebGLRenderingContext} gl - WebGL context
         */
        initFromContext(gl: IRenderingContext): void;
        /**
         * Initialize from context options
         *
         * @protected
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
         * @param {object} options - context attributes
         */
        initFromOptions(options: WebGLContextAttributes): void;
        /**
         * Helper class to create a WebGL Context
         *
         * @param canvas - the canvas element that we will get the context from
         * @param options - An options object that gets passed in to the canvas element containing the
         *    context attributes
         * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext
         * @return {WebGLRenderingContext} the WebGL context
         */
        createContext(canvas: HTMLCanvasElement, options: WebGLContextAttributes): IRenderingContext;
        /** Auto-populate the {@link PIXI.ContextSystem.extensions extensions}. */
        protected getExtensions(): void;
        /**
         * Handles a lost webgl context
         *
         * @param {WebGLContextEvent} event - The context lost event.
         */
        protected handleContextLost(event: WebGLContextEvent): void;
        /** Handles a restored webgl context. */
        protected handleContextRestored(): void;
        destroy(): void;
        /** Handle the post-render runner event. */
        protected postrender(): void;
        /**
         * Validate context.
         *
         * @param {WebGLRenderingContext} gl - Render context.
         */
        protected validateContext(gl: IRenderingContext): void;
    }

    /**
     * @ignore
     *
     * logic originally from here: https://github.com/sketchpunk/FunWithWebGL2/blob/master/lesson_022/Shaders.js
     * rewrote it, but this was a great starting point to get a solid understanding of whats going on :)
     *
     * @param uniformData
     */
    export function createUBOElements(uniformData: IUniformData[]): {
        uboElements: UBOElement[];
        size: number;
    };

    /**
     * Resource for a CubeTexture which contains six resources.
     *
     * @memberof PIXI
     */
    export class CubeResource extends AbstractMultiResource {
        items: any;
        /**
         * In case BaseTextures are supplied, whether to use same resource or bind baseTexture itself.
         *
         * @protected
         */
        linkBaseTexture: boolean;
        /**
         * @param {Array<string|PIXI.Resource>} [source] - Collection of URLs or resources
         *        to use as the sides of the cube.
         * @param options - ImageResource options
         * @param {number} [options.width] - Width of resource
         * @param {number} [options.height] - Height of resource
         * @param {number} [options.autoLoad=true] - Whether to auto-load resources
         * @param {number} [options.linkBaseTexture=true] - In case BaseTextures are supplied,
         *   whether to copy them or use
         */
        constructor(source?: any, options?: ICubeResourceOptions);
        /**
         * Add binding.
         *
         * @param baseTexture - parent base texture
         */
        bind(baseTexture: BaseTexture): void;
        addBaseTextureAt(baseTexture: BaseTexture, index: number, linkBaseTexture?: boolean): this;
        /**
         * Upload the resource
         *
         * @returns {boolean} true is success
         */
        upload(renderer: Renderer, _baseTexture: BaseTexture, glTexture: GLTexture): boolean;
        /** Number of texture sides to store for CubeResources. */
        static SIDES: number;
        /**
         * Used to auto-detect the type of resource.
         *
         * @param {*} source - The source object
         * @return {boolean} `true` if source is an array of 6 elements
         */
        static test(source: unknown): source is any;
    }

    export const defaultFilterVertex: string;

    /**
     * Default filter vertex shader
     * @memberof PIXI
     * @member {string} defaultFilterVertex
     */
    export const defaultVertex: string;

    /**
     * A filter is a special shader that applies post-processing effects to an input texture and writes into an output
     * render-target.
     *
     * {@link http://pixijs.io/examples/#/filters/blur-filter.js Example} of the
     * {@link PIXI.filters.BlurFilter BlurFilter}.
     *
     * ### Usage
     * Filters can be applied to any DisplayObject or Container.
     * PixiJS' `FilterSystem` renders the container into temporary Framebuffer,
     * then filter renders it to the screen.
     * Multiple filters can be added to the `filters` array property and stacked on each other.
     *
     * ```
     * const filter = new PIXI.Filter(myShaderVert, myShaderFrag, { myUniform: 0.5 });
     * const container = new PIXI.Container();
     * container.filters = [filter];
     * ```
     *
     * ### Previous Version Differences
     *
     * In PixiJS **v3**, a filter was always applied to _whole screen_.
     *
     * In PixiJS **v4**, a filter can be applied _only part of the screen_.
     * Developers had to create a set of uniforms to deal with coordinates.
     *
     * In PixiJS **v5** combines _both approaches_.
     * Developers can use normal coordinates of v3 and then allow filter to use partial Framebuffers,
     * bringing those extra uniforms into account.
     *
     * Also be aware that we have changed default vertex shader, please consult
     * {@link https://github.com/pixijs/pixi.js/wiki/v5-Creating-filters Wiki}.
     *
     * ### Frames
     *
     * The following table summarizes the coordinate spaces used in the filtering pipeline:
     *
     * <table>
     * <thead>
     *   <tr>
     *     <th>Coordinate Space</th>
     *     <th>Description</th>
     *   </tr>
     * </thead>
     * <tbody>
     *   <tr>
     *     <td>Texture Coordinates</td>
     *     <td>
     *         The texture (or UV) coordinates in the input base-texture's space. These are normalized into the (0,1) range along
     *         both axes.
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>World Space</td>
     *     <td>
     *         A point in the same space as the world bounds of any display-object (i.e. in the scene graph's space).
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>Physical Pixels</td>
     *     <td>
     *         This is base-texture's space with the origin on the top-left. You can calculate these by multiplying the texture
     *         coordinates by the dimensions of the texture.
     *     </td>
     *   </tr>
     * </tbody>
     * </table>
     *
     * ### Built-in Uniforms
     *
     * PixiJS viewport uses screen (CSS) coordinates, `(0, 0, renderer.screen.width, renderer.screen.height)`,
     * and `projectionMatrix` uniform maps it to the gl viewport.
     *
     * **uSampler**
     *
     * _Important note: as with all Framebuffers in PixiJS, both input and output are
     * premultiplied by alpha._
     *
     * By default, input normalized coordinates are passed to fragment shader with `vTextureCoord`.
     * Use it to sample the input.
     *
     * ```
     * const fragment = `
     * varying vec2 vTextureCoord;
     * uniform sampler2D uSampler;
     * void main(void)
     * {
     *    gl_FragColor = texture2D(uSampler, vTextureCoord);
     * }
     * `;
     *
     * const myFilter = new PIXI.Filter(null, fragment);
     * ```
     *
     * This filter is just one uniform less than {@link PIXI.filters.AlphaFilter AlphaFilter}.
     *
     * **outputFrame**
     *
     * The `outputFrame` holds the rectangle where filter is applied in screen (CSS) coordinates.
     * It's the same as `renderer.screen` for a fullscreen filter.
     * Only a part of  `outputFrame.zw` size of temporary Framebuffer is used,
     * `(0, 0, outputFrame.width, outputFrame.height)`,
     *
     * Filters uses this quad to normalized (0-1) space, its passed into `aVertexPosition` attribute.
     * To calculate vertex position in screen space using normalized (0-1) space:
     *
     * ```
     * vec4 filterVertexPosition( void )
     * {
     *     vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
     *     return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
     * }
     * ```
     *
     * **inputSize**
     *
     * Temporary framebuffer is different, it can be either the size of screen, either power-of-two.
     * The `inputSize.xy` are size of temporary framebuffer that holds input.
     * The `inputSize.zw` is inverted, it's a shortcut to evade division inside the shader.
     *
     * Set `inputSize.xy = outputFrame.zw` for a fullscreen filter.
     *
     * To calculate input normalized coordinate, you have to map it to filter normalized space.
     * Multiply by `outputFrame.zw` to get input coordinate.
     * Divide by `inputSize.xy` to get input normalized coordinate.
     *
     * ```
     * vec2 filterTextureCoord( void )
     * {
     *     return aVertexPosition * (outputFrame.zw * inputSize.zw); // same as /inputSize.xy
     * }
     * ```
     * **resolution**
     *
     * The `resolution` is the ratio of screen (CSS) pixels to real pixels.
     *
     * **inputPixel**
     *
     * `inputPixel.xy` is the size of framebuffer in real pixels, same as `inputSize.xy * resolution`
     * `inputPixel.zw` is inverted `inputPixel.xy`.
     *
     * It's handy for filters that use neighbour pixels, like {@link PIXI.filters.FXAAFilter FXAAFilter}.
     *
     * **inputClamp**
     *
     * If you try to get info from outside of used part of Framebuffer - you'll get undefined behaviour.
     * For displacements, coordinates has to be clamped.
     *
     * The `inputClamp.xy` is left-top pixel center, you may ignore it, because we use left-top part of Framebuffer
     * `inputClamp.zw` is bottom-right pixel center.
     *
     * ```
     * vec4 color = texture2D(uSampler, clamp(modifiedTextureCoord, inputClamp.xy, inputClamp.zw))
     * ```
     * OR
     * ```
     * vec4 color = texture2D(uSampler, min(modifigedTextureCoord, inputClamp.zw))
     * ```
     *
     * ### Additional Information
     *
     * Complete documentation on Filter usage is located in the
     * {@link https://github.com/pixijs/pixi.js/wiki/v5-Creating-filters Wiki}.
     *
     * Since PixiJS only had a handful of built-in filters, additional filters can be downloaded
     * {@link https://github.com/pixijs/pixi-filters here} from the PixiJS Filters repository.
     *
     * @memberof PIXI
     */
    export class Filter extends Shader {
        /**
         * The padding of the filter. Some filters require extra space to breath such as a blur.
         * Increasing this will add extra width and height to the bounds of the object that the
         * filter is applied to.
         */
        padding: number;
        /** The samples of the filter. */
        multisample: MSAA_QUALITY;
        /** If enabled is true the filter is applied, if false it will not. */
        enabled: boolean;
        /**
         * If enabled, PixiJS will fit the filter area into boundaries for better performance.
         * Switch it off if it does not work for specific shader.
         *
         * @default true
         */
        autoFit: boolean;
        /**
         * Legacy filters use position and uvs from attributes (set by filter system)
         *
         * @readonly
         */
        legacy: boolean;
        /** The WebGL state the filter requires to render. */
        state: State;
        protected _resolution: number;
        /**
         * @param vertexSrc - The source of the vertex shader.
         * @param fragmentSrc - The source of the fragment shader.
         * @param uniforms - Custom uniforms to use to augment the built-in ones.
         */
        constructor(vertexSrc?: string, fragmentSrc?: string, uniforms?: any);
        /**
         * Applies the filter
         *
         * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
         * @param {PIXI.RenderTexture} input - The input render target.
         * @param {PIXI.RenderTexture} output - The target to output to.
         * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it.
         * @param {object} [currentState] - It's current state of filter.
         *        There are some useful properties in the currentState :
         *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
         */
        apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES, _currentState?: FilterState): void;
        /**
         * Sets the blend mode of the filter.
         *
         * @default PIXI.BLEND_MODES.NORMAL
         */
        get blendMode(): BLEND_MODES;
        set blendMode(value: BLEND_MODES);
        /**
         * The resolution of the filter. Setting this to be lower will lower the quality but
         * increase the performance of the filter.
         */
        get resolution(): number;
        set resolution(value: number);
        /**
         * The default vertex shader source
         *
         * @constant
         */
        static get defaultVertexSrc(): string;
        /**
         * The default fragment shader source
         *
         * @constant
         */
        static get defaultFragmentSrc(): string;
        /** Used for caching shader IDs. */
        static SOURCE_KEY_MAP: any;
    }

    /**
     * System plugin to the renderer to manage filter states.
     *
     * @ignore
     */
    export class FilterState {
        renderTexture: RenderTexture;
        /**
         * Target of the filters
         * We store for case when custom filter wants to know the element it was applied on
         * @member {PIXI.DisplayObject}
         */
        target: IFilterTarget;
        /**
         * Compatibility with PixiJS v4 filters
         * @default false
         */
        legacy: boolean;
        /**
         * Resolution of filters
         * @default 1
         */
        resolution: number;
        /**
         * Number of samples
         * @default MSAA_QUALITY.NONE
         */
        multisample: MSAA_QUALITY;
        /** Source frame. */
        sourceFrame: Rectangle;
        /** Destination frame. */
        destinationFrame: Rectangle;
        /** Original render-target source frame. */
        bindingSourceFrame: Rectangle;
        /** Original render-target destination frame. */
        bindingDestinationFrame: Rectangle;
        /** Collection of filters. */
        filters: Array<Filter>;
        /** Projection system transform saved by link. */
        transform: Matrix;
        constructor();
        /** Clears the state */
        clear(): void;
    }

    /**
     * System plugin to the renderer to manage filters.
     *
     * ## Pipeline
     *
     * The FilterSystem executes the filtering pipeline by rendering the display-object into a texture, applying its
     * [filters]{@link PIXI.Filter} in series, and the last filter outputs into the final render-target.
     *
     * The filter-frame is the rectangle in world space being filtered, and those contents are mapped into
     * `(0, 0, filterFrame.width, filterFrame.height)` into the filter render-texture. The filter-frame is also called
     * the source-frame, as it is used to bind the filter render-textures. The last filter outputs to the `filterFrame`
     * in the final render-target.
     *
     * ## Usage
     *
     * {@link PIXI.Container#renderAdvanced} is an example of how to use the filter system. It is a 3 step process:
     *
     * * **push**: Use {@link PIXI.FilterSystem#push} to push the set of filters to be applied on a filter-target.
     * * **render**: Render the contents to be filtered using the renderer. The filter-system will only capture the contents
     *      inside the bounds of the filter-target. NOTE: Using {@link PIXI.Renderer#render} is
     *      illegal during an existing render cycle, and it may reset the filter system.
     * * **pop**: Use {@link PIXI.FilterSystem#pop} to pop & execute the filters you initially pushed. It will apply them
     *      serially and output to the bounds of the filter-target.
     *
     * @memberof PIXI
     */
    export class FilterSystem implements ISystem {
        /**
         * List of filters for the FilterSystem
         * @member {Object[]}
         */
        readonly defaultFilterStack: Array<FilterState>;
        /** A pool for storing filter states, save us creating new ones each tick. */
        statePool: Array<FilterState>;
        /** Stores a bunch of POT textures used for filtering. */
        texturePool: RenderTexturePool;
        /** Whether to clear output renderTexture in AUTO/BLIT mode. See {@link PIXI.CLEAR_MODES}. */
        forceClear: boolean;
        /**
         * Old padding behavior is to use the max amount instead of sum padding.
         * Use this flag if you need the old behavior.
         * @default false
         */
        useMaxPadding: boolean;
        /** A very simple geometry used when drawing a filter effect to the screen. */
        protected quad: Quad;
        /** Quad UVs */
        protected quadUv: QuadUv;
        /**
         * Active state
         * @member {object}
         */
        protected activeState: FilterState;
        /**
         * This uniform group is attached to filter uniforms when used.
         *
         * @property {PIXI.Rectangle} outputFrame
         * @property {Float32Array} inputSize
         * @property {Float32Array} inputPixel
         * @property {Float32Array} inputClamp
         * @property {Number} resolution
         * @property {Float32Array} filterArea
         * @property {Float32Array} filterClamp
         */
        protected globalUniforms: UniformGroup;
        /** Temporary rect for math. */
        private tempRect;
        renderer: Renderer;
        /**
         * @param renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * Pushes a set of filters to be applied later to the system. This will redirect further rendering into an
         * input render-texture for the rest of the filtering pipeline.
         *
         * @param {PIXI.DisplayObject} target - The target of the filter to render.
         * @param filters - The filters to apply.
         */
        push(target: IFilterTarget, filters: Array<Filter>): void;
        /** Pops off the filter and applies it. */
        pop(): void;
        /**
         * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
         *
         * @param filterTexture - renderTexture to bind, should belong to filter pool or filter stack
         * @param clearMode - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
         */
        bindAndClear(filterTexture: RenderTexture, clearMode?: CLEAR_MODES): void;
        /**
         * Draws a filter using the default rendering process.
         *
         * This should be called only by {@link Filter#apply}.
         *
         * @param filter - The filter to draw.
         * @param input - The input render target.
         * @param output - The target to output to.
         * @param clearMode - Should the output be cleared before rendering to it
         */
        applyFilter(filter: Filter, input: RenderTexture, output: RenderTexture, clearMode?: CLEAR_MODES): void;
        /**
         * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
         *
         * Use `outputMatrix * vTextureCoord` in the shader.
         *
         * @param outputMatrix - The matrix to output to.
         * @param {PIXI.Sprite} sprite - The sprite to map to.
         * @return The mapped matrix.
         */
        calculateSpriteMatrix(outputMatrix: Matrix, sprite: ISpriteMaskTarget): Matrix;
        /** Destroys this Filter System. */
        destroy(): void;
        /**
         * Gets a Power-of-Two render texture or fullScreen texture
         *
         * @param minWidth - The minimum width of the render texture in real pixels.
         * @param minHeight - The minimum height of the render texture in real pixels.
         * @param resolution - The resolution of the render texture.
         * @param multisample - Number of samples of the render texture.
         * @return - The new render texture.
         */
        protected getOptimalFilterTexture(minWidth: number, minHeight: number, resolution?: number, multisample?: MSAA_QUALITY): RenderTexture;
        /**
         * Gets extra render texture to use inside current filter
         * To be compliant with older filters, you can use params in any order
         *
         * @param input - renderTexture from which size and resolution will be copied
         * @param resolution - override resolution of the renderTexture
         * @param multisample - number of samples of the renderTexture
         */
        getFilterTexture(input?: RenderTexture, resolution?: number, multisample?: MSAA_QUALITY): RenderTexture;
        /**
         * Frees a render texture back into the pool.
         *
         * @param renderTexture - The renderTarget to free
         */
        returnFilterTexture(renderTexture: RenderTexture): void;
        /** Empties the texture pool. */
        emptyPool(): void;
        /** Calls `texturePool.resize()`, affects fullScreen renderTextures. */
        resize(): void;
        /**
         * @param matrix - first param
         * @param rect - second param
         */
        private transformAABB;
        private roundFrame;
    }

    /**
     * A framebuffer can be used to render contents off of the screen. {@link PIXI.BaseRenderTexture} uses
     * one internally to render into itself. You can attach a depth or stencil buffer to a framebuffer.
     *
     * On WebGL 2 machines, shaders can output to multiple textures simultaneously with GLSL 300 ES.
     *
     * @class
     * @memberof PIXI
     */
    export class Framebuffer {
        width: number;
        height: number;
        multisample: MSAA_QUALITY;
        stencil: boolean;
        depth: boolean;
        dirtyId: number;
        dirtyFormat: number;
        dirtySize: number;
        depthTexture: BaseTexture;
        colorTextures: Array<BaseTexture>;
        glFramebuffers: {
            [key: string]: GLFramebuffer;
        };
        disposeRunner: Runner;
        /**
         * @param {number} width - Width of the frame buffer
         * @param {number} height - Height of the frame buffer
         */
        constructor(width: number, height: number);
        /**
         * Reference to the colorTexture.
         *
         * @member {PIXI.BaseTexture[]}
         * @readonly
         */
        get colorTexture(): BaseTexture;
        /**
         * Add texture to the colorTexture array
         *
         * @param {number} [index=0] - Index of the array to add the texture to
         * @param {PIXI.BaseTexture} [texture] - Texture to add to the array
         */
        addColorTexture(index?: number, texture?: BaseTexture): this;
        /**
         * Add a depth texture to the frame buffer
         *
         * @param {PIXI.BaseTexture} [texture] - Texture to add
         */
        addDepthTexture(texture?: BaseTexture): this;
        /**
         * Enable depth on the frame buffer
         */
        enableDepth(): this;
        /**
         * Enable stencil on the frame buffer
         */
        enableStencil(): this;
        /**
         * Resize the frame buffer
         *
         * @param {number} width - Width of the frame buffer to resize to
         * @param {number} height - Height of the frame buffer to resize to
         */
        resize(width: number, height: number): void;
        /**
         * Disposes WebGL resources that are connected to this geometry
         */
        dispose(): void;
        /**
         * Destroys and removes the depth texture added to this framebuffer.
         */
        destroyDepthTexture(): void;
    }

    /**
     * System plugin to the renderer to manage framebuffers.
     *
     * @class
     * @extends PIXI.System
     * @memberof PIXI
     */
    export class FramebufferSystem implements ISystem {
        readonly managedFramebuffers: Array<Framebuffer>;
        current: Framebuffer;
        viewport: Rectangle;
        hasMRT: boolean;
        writeDepthTexture: boolean;
        protected CONTEXT_UID: number;
        protected gl: IRenderingContext;
        protected unknownFramebuffer: Framebuffer;
        protected msaaSamples: Array<number>;
        renderer: Renderer;
        /**
         * @param {PIXI.Renderer} renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * Sets up the renderer context and necessary buffers.
         */
        protected contextChange(): void;
        /**
         * Bind a framebuffer
         *
         * @param {PIXI.Framebuffer} [framebuffer]
         * @param {PIXI.Rectangle} [frame] - frame, default is framebuffer size
         * @param {number} [mipLevel] - optional mip level to set on the framebuffer - defaults to 0
         */
        bind(framebuffer?: Framebuffer, frame?: Rectangle, mipLevel?: number): void;
        /**
         * Set the WebGLRenderingContext's viewport.
         *
         * @param {Number} x - X position of viewport
         * @param {Number} y - Y position of viewport
         * @param {Number} width - Width of viewport
         * @param {Number} height - Height of viewport
         */
        setViewport(x: number, y: number, width: number, height: number): void;
        /**
         * Get the size of the current width and height. Returns object with `width` and `height` values.
         *
         * @member {object}
         * @readonly
         */
        get size(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        /**
         * Clear the color of the context
         *
         * @param {Number} r - Red value from 0 to 1
         * @param {Number} g - Green value from 0 to 1
         * @param {Number} b - Blue value from 0 to 1
         * @param {Number} a - Alpha value from 0 to 1
         * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
         *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
         */
        clear(r: number, g: number, b: number, a: number, mask?: BUFFER_BITS): void;
        /**
         * Initialize framebuffer for this context
         *
         * @protected
         * @param {PIXI.Framebuffer} framebuffer
         * @returns {PIXI.GLFramebuffer} created GLFramebuffer
         */
        initFramebuffer(framebuffer: Framebuffer): GLFramebuffer;
        /**
         * Resize the framebuffer
         *
         * @protected
         * @param {PIXI.Framebuffer} framebuffer
         */
        resizeFramebuffer(framebuffer: Framebuffer): void;
        /**
         * Update the framebuffer
         *
         * @protected
         * @param {PIXI.Framebuffer} framebuffer
         * @param {number} mipLevel
         */
        updateFramebuffer(framebuffer: Framebuffer, mipLevel: number): void;
        /**
         * Returns true if the frame buffer can be multisampled
         *
         * @protected
         * @param {PIXI.Framebuffer} framebuffer
         */
        protected canMultisampleFramebuffer(framebuffer: Framebuffer): boolean;
        /**
         * Detects number of samples that is not more than a param but as close to it as possible
         *
         * @param {PIXI.MSAA_QUALITY} samples - number of samples
         * @returns {PIXI.MSAA_QUALITY} - recommended number of samples
         */
        protected detectSamples(samples: MSAA_QUALITY): MSAA_QUALITY;
        /**
         * Only works with WebGL2
         *
         * blits framebuffer to another of the same or bigger size
         * after that target framebuffer is bound
         *
         * Fails with WebGL warning if blits multisample framebuffer to different size
         *
         * @param {PIXI.Framebuffer} [framebuffer] - by default it blits "into itself", from renderBuffer to texture.
         * @param {PIXI.Rectangle} [sourcePixels] - source rectangle in pixels
         * @param {PIXI.Rectangle} [destPixels] - dest rectangle in pixels, assumed to be the same as sourcePixels
         */
        blit(framebuffer?: Framebuffer, sourcePixels?: Rectangle, destPixels?: Rectangle): void;
        /**
         * Disposes framebuffer
         * @param {PIXI.Framebuffer} framebuffer - framebuffer that has to be disposed of
         * @param {boolean} [contextLost=false] - If context was lost, we suppress all delete function calls
         */
        disposeFramebuffer(framebuffer: Framebuffer, contextLost?: boolean): void;
        /**
         * Disposes all framebuffers, but not textures bound to them
         * @param {boolean} [contextLost=false] - If context was lost, we suppress all delete function calls
         */
        disposeAll(contextLost?: boolean): void;
        /**
         * Forcing creation of stencil buffer for current framebuffer, if it wasn't done before.
         * Used by MaskSystem, when its time to use stencil mask for Graphics element.
         *
         * Its an alternative for public lazy `framebuffer.enableStencil`, in case we need stencil without rebind.
         *
         * @private
         */
        forceStencil(): void;
        /**
         * resets framebuffer stored state, binds screen framebuffer
         *
         * should be called before renderTexture reset()
         */
        reset(): void;
        /**
         * @ignore
         */
        destroy(): void;
    }

    /**
     * generates a WebGL Program object from a high level Pixi Program.
     *
     * @param gl - a rendering context on which to generate the program
     * @param program - the high level Pixi Program.
     */
    export function generateProgram(gl: IRenderingContext, program: Program): GLProgram;

    export function generateUniformBufferSync(group: UniformGroup, uniformData: any): {
        size: number;
        syncFunc: UniformsSyncCallback;
    };

    /**
     * The Geometry represents a model. It consists of two components:
     * - GeometryStyle - The structure of the model such as the attributes layout
     * - GeometryData - the data of the model - this consists of buffers.
     * This can include anything from positions, uvs, normals, colors etc.
     *
     * Geometry can be defined without passing in a style or data if required (thats how I prefer!)
     *
     * ```js
     * let geometry = new PIXI.Geometry();
     *
     * geometry.addAttribute('positions', [0, 0, 100, 0, 100, 100, 0, 100], 2);
     * geometry.addAttribute('uvs', [0,0,1,0,1,1,0,1],2)
     * geometry.addIndex([0,1,2,1,3,2])
     * ```
     *
     * @memberof PIXI
     */
    export class Geometry {
        buffers: Array<Buffer_2>;
        indexBuffer: Buffer_2;
        attributes: {
            [key: string]: Attribute;
        };
        id: number;
        /** Whether the geometry is instanced. */
        instanced: boolean;
        /**
         * Number of instances in this geometry, pass it to `GeometrySystem.draw()`.
         *
         * @default 1
         */
        instanceCount: number;
        /**
         * A map of renderer IDs to webgl VAOs
         *
         * @type {object}
         */
        glVertexArrayObjects: {
            [key: number]: {
                [key: string]: WebGLVertexArrayObject;
            };
        };
        disposeRunner: Runner;
        /** Count of existing (not destroyed) meshes that reference this geometry. */
        refCount: number;
        /**
         * @param buffers - An array of buffers. optional.
         * @param attributes - Of the geometry, optional structure of the attributes layout
         */
        constructor(buffers?: Array<Buffer_2>, attributes?: {
            [key: string]: Attribute;
        });
        /**
         *
         * Adds an attribute to the geometry
         * Note: `stride` and `start` should be `undefined` if you dont know them, not 0!
         *
         * @param id - the name of the attribute (matching up to a shader)
         * @param {PIXI.Buffer|number[]} buffer - the buffer that holds the data of the attribute . You can also provide an Array and a buffer will be created from it.
         * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
         * @param normalized - should the data be normalized.
         * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {PIXI.TYPES} to see the ones available
         * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
         * @param [start=0] - How far into the array to start reading values (used for interleaving data)
         * @param instance - Instancing flag
         * @return - Returns self, useful for chaining.
         */
        addAttribute(id: string, buffer: Buffer_2 | Float32Array | Uint32Array | Array<number>, size?: number, normalized?: boolean, type?: TYPES, stride?: number, start?: number, instance?: boolean): this;
        /**
         * Returns the requested attribute.
         *
         * @param id - The name of the attribute required
         * @return - The attribute requested.
         */
        getAttribute(id: string): Attribute;
        /**
         * Returns the requested buffer.
         *
         * @param id - The name of the buffer required.
         * @return - The buffer requested.
         */
        getBuffer(id: string): Buffer_2;
        /**
        *
        * Adds an index buffer to the geometry
        * The index buffer contains integers, three for each triangle in the geometry, which reference the various attribute buffers (position, colour, UV coordinates, other UV coordinates, normal, …). There is only ONE index buffer.
        *
        * @param {PIXI.Buffer|number[]} [buffer] - The buffer that holds the data of the index buffer. You can also provide an Array and a buffer will be created from it.
        * @return - Returns self, useful for chaining.
        */
        addIndex(buffer?: Buffer_2 | IArrayBuffer | number[]): Geometry;
        /**
         * Returns the index buffer
         *
         * @return - The index buffer.
         */
        getIndex(): Buffer_2;
        /**
         * This function modifies the structure so that all current attributes become interleaved into a single buffer
         * This can be useful if your model remains static as it offers a little performance boost
         *
         * @return - Returns self, useful for chaining.
         */
        interleave(): Geometry;
        /** Get the size of the geometries, in vertices. */
        getSize(): number;
        /** Disposes WebGL resources that are connected to this geometry. */
        dispose(): void;
        /** Destroys the geometry. */
        destroy(): void;
        /**
         * Returns a clone of the geometry.
         *
         * @returns - A new clone of this geometry.
         */
        clone(): Geometry;
        /**
         * Merges an array of geometries into a new single one.
         *
         * Geometry attribute styles must match for this operation to work.
         *
         * @param geometries - array of geometries to merge
         * @return - Shiny new geometry!
         */
        static merge(geometries: Array<Geometry>): Geometry;
    }

    /**
     * System plugin to the renderer to manage geometry.
     *
     * @memberof PIXI
     */
    export class GeometrySystem implements ISystem {
        /**
         * `true` if we has `*_vertex_array_object` extension.
         *
         * @readonly
         */
        hasVao: boolean;
        /**
         * `true` if has `ANGLE_instanced_arrays` extension.
         *
         * @readonly
         */
        hasInstance: boolean;
        /**
         * `true` if support `gl.UNSIGNED_INT` in `gl.drawElements` or `gl.drawElementsInstanced`.
         *
         * @readonly
         */
        canUseUInt32ElementIndex: boolean;
        protected CONTEXT_UID: number;
        protected gl: IRenderingContext;
        protected _activeGeometry: Geometry;
        protected _activeVao: WebGLVertexArrayObject;
        protected _boundBuffer: GLBuffer;
        /** Cache for all geometries by id, used in case renderer gets destroyed or for profiling. */
        readonly managedGeometries: {
            [key: number]: Geometry;
        };
        /** Renderer that owns this {@link GeometrySystem}. */
        private renderer;
        /** @param renderer - The renderer this System works for. */
        constructor(renderer: Renderer);
        /** Sets up the renderer context and necessary buffers. */
        protected contextChange(): void;
        /**
         * Binds geometry so that is can be drawn. Creating a Vao if required
         *
         * @param geometry - Instance of geometry to bind.
         * @param shader - Instance of shader to use vao for.
         */
        bind(geometry?: Geometry, shader?: Shader): void;
        /** Reset and unbind any active VAO and geometry. */
        reset(): void;
        /** Update buffers of the currently bound geometry. */
        updateBuffers(): void;
        /**
         * Check compatibility between a geometry and a program
         *
         * @param geometry - Geometry instance.
         * @param program - Program instance.
         */
        protected checkCompatibility(geometry: Geometry, program: Program): void;
        /**
         * Takes a geometry and program and generates a unique signature for them.
         *
         * @param geometry - To get signature from.
         * @param program - To test geometry against.
         * @return - Unique signature of the geometry and program
         */
        protected getSignature(geometry: Geometry, program: Program): string;
        /**
         * Creates or gets Vao with the same structure as the geometry and stores it on the geometry.
         * If vao is created, it is bound automatically. We use a shader to infer what and how to set up the
         * attribute locations.
         *
         * @param geometry - Instance of geometry to to generate Vao for.
         * @param shader - Instance of the shader.
         * @param incRefCount - Increment refCount of all geometry buffers.
         */
        protected initGeometryVao(geometry: Geometry, shader: Shader, incRefCount?: boolean): WebGLVertexArrayObject;
        /**
         * Disposes geometry.
         *
         * @param geometry - Geometry with buffers. Only VAO will be disposed
         * @param [contextLost=false] - If context was lost, we suppress deleteVertexArray
         */
        disposeGeometry(geometry: Geometry, contextLost?: boolean): void;
        /**
         * Dispose all WebGL resources of all managed geometries.
         *
         * @param [contextLost=false] - If context was lost, we suppress `gl.delete` calls
         */
        disposeAll(contextLost?: boolean): void;
        /**
         * Activate vertex array object.
         *
         * @param geometry - Geometry instance.
         * @param program - Shader program instance.
         */
        protected activateVao(geometry: Geometry, program: Program): void;
        /**
         * Draws the currently bound geometry.
         *
         * @param type - The type primitive to render.
         * @param size - The number of elements to be rendered. If not specified, all vertices after the
         *  starting vertex will be drawn.
         * @param start - The starting vertex in the geometry to start drawing from. If not specified,
         *  drawing will start from the first vertex.
         * @param instanceCount - The number of instances of the set of elements to execute. If not specified,
         *  all instances will be drawn.
         */
        draw(type: DRAW_MODES, size?: number, start?: number, instanceCount?: number): this;
        /** Unbind/reset everything. */
        protected unbind(): void;
        destroy(): void;
    }

    /**
     * returns a little WebGL context to use for program inspection.
     *
     * @static
     * @private
     * @returns {WebGLRenderingContext} a gl context to test with
     */
    export function getTestContext(): WebGLRenderingContext | WebGL2RenderingContext;

    export function getUBOData(uniforms: any, uniformData: any): any[];

    class GLBuffer {
        buffer: WebGLBuffer;
        updateID: number;
        byteLength: number;
        refCount: number;
        constructor(buffer?: WebGLBuffer);
    }

    /**
     * Internal framebuffer for WebGL context
     * @class
     * @memberof PIXI
     */
    export class GLFramebuffer {
        framebuffer: WebGLFramebuffer;
        stencil: WebGLRenderbuffer;
        multisample: MSAA_QUALITY;
        msaaBuffer: WebGLRenderbuffer;
        blitFramebuffer: Framebuffer;
        dirtyId: number;
        dirtyFormat: number;
        dirtySize: number;
        mipLevel: number;
        constructor(framebuffer: WebGLTexture);
    }

    /**
     * Helper class to create a WebGL Program
     *
     * @class
     * @memberof PIXI
     */
    export class GLProgram {
        program: WebGLProgram;
        uniformData: any;
        uniformGroups: any;
        /**
         * A hash that stores where UBOs are bound to on the program.
         */
        uniformBufferBindings: any;
        /**
         * A hash for lazily-generated uniform uploading functions.
         */
        uniformSync: any;
        /**
         * a place where dirty ticks are stored for groups
         * If a tick here does not match with the Higher level Programs tick, it means
         * we should re upload the data.
         */
        uniformDirtyGroups: any;
        /**
         * Makes a new Pixi program
         *
         * @param {WebGLProgram} program - webgl program
         * @param {Object} uniformData - uniforms
         */
        constructor(program: WebGLProgram, uniformData: {
            [key: string]: IGLUniformData;
        });
        /**
         * Destroys this program
         */
        destroy(): void;
    }

    /**
     * Internal texture for WebGL context
     * @class
     * @memberof PIXI
     */
    export class GLTexture {
        texture: WebGLTexture;
        width: number;
        height: number;
        mipmap: boolean;
        wrapMode: number;
        type: number;
        internalFormat: number;
        /** Type of sampler corresponding to this texture. See {@link PIXI.SAMPLER_TYPES} */
        samplerType: number;
        dirtyId: number;
        dirtyStyleId: number;
        constructor(texture: WebGLTexture);
    }

    /**
     * Marks places in PixiJS where you can pass Float32Array, UInt32Array, any typed arrays, and ArrayBuffer
     *
     * Same as ArrayBuffer in typescript lib, defined here just for documentation
     */
    export interface IArrayBuffer extends ArrayBuffer {
    }

    export interface IAttributeData {
        type: string;
        size: number;
        location: number;
        name: string;
    }

    export type IAutoDetectOptions = ISize | ICubeResourceOptions | IImageResourceOptions | ISVGResourceOptions | IVideoResourceOptions | IResourcePluginOptions;

    export interface IBaseTextureOptions<RO = any> {
        alphaMode?: ALPHA_MODES;
        mipmap?: MIPMAP_MODES;
        anisotropicLevel?: number;
        scaleMode?: SCALE_MODES;
        width?: number;
        height?: number;
        wrapMode?: WRAP_MODES;
        format?: FORMATS;
        type?: TYPES;
        target?: TARGETS;
        resolution?: number;
        multisample?: MSAA_QUALITY;
        resourceOptions?: RO;
        pixiIdPrefix?: string;
    }

    /**
     * Interface for elements like Sprite, Mesh etc. for batching.
     *
     * @memberof PIXI
     */
    export interface IBatchableElement {
        _texture: Texture;
        vertexData: Float32Array;
        indices: Uint16Array | Uint32Array | Array<number>;
        uvs: Float32Array;
        worldAlpha: number;
        _tintRGB: number;
        blendMode: BLEND_MODES;
    }

    export interface IBatchFactoryOptions {
        vertex?: string;
        fragment?: string;
        geometryClass?: typeof BatchGeometry;
        vertexSize?: number;
    }

    /**
     * Constructor options for CubeResource
     */
    export interface ICubeResourceOptions extends ISize {
        /** Whether to auto-load resources */
        autoLoad?: boolean;
        /** In case BaseTextures are supplied, whether to copy them or use. */
        linkBaseTexture?: boolean;
    }

    export interface IFilterTarget {
        filterArea: Rectangle;
        getBounds(skipUpdate?: boolean): Rectangle;
    }

    export interface IGenerateTextureOptions {
        scaleMode?: SCALE_MODES;
        resolution?: number;
        region?: Rectangle;
        multisample?: MSAA_QUALITY;
    }

    /**
     * @private
     */
    export class IGLUniformData {
        location: WebGLUniformLocation;
        value: number | boolean | Float32Array | Int32Array | Uint32Array | boolean[];
    }

    export interface IImageResourceOptions {
        /** Start loading process */
        autoLoad?: boolean;
        /** Whether its required to create a bitmap before upload. */
        createBitmap?: boolean;
        /** Load image using cross origin. */
        crossorigin?: boolean | string;
        /** Premultiply image alpha in bitmap. */
        alphaMode?: ALPHA_MODES;
    }

    /**
     * Resource type for ImageBitmap.
     *
     * @memberof PIXI
     */
    export class ImageBitmapResource extends BaseImageResource {
        /**
         * @param source - Image element to use
         */
        constructor(source: ImageBitmap);
        /**
         * Used to auto-detect the type of resource.
         *
         * @param {*} source - The source object
         * @return {boolean} `true` if source is an ImageBitmap
         */
        static test(source: unknown): source is ImageBitmap;
    }

    /**
     * Resource type for HTMLImageElement.
     *
     * @memberof PIXI
     */
    export class ImageResource extends BaseImageResource {
        /** URL of the image source */
        url: string;
        /**
         * If the image should be disposed after upload
         *
         * @default false
         */
        preserveBitmap: boolean;
        /**
         * If capable, convert the image using createImageBitmap API.
         *
         * @default PIXI.settings.CREATE_IMAGE_BITMAP
         */
        createBitmap: boolean;
        /**
         * Controls texture alphaMode field
         * Copies from options
         * Default is `null`, copies option from baseTexture
         *
         * @readonly
         */
        alphaMode: ALPHA_MODES;
        /**
         * The ImageBitmap element created for a {@code HTMLImageElement}.
         *
         * @default null
         */
        bitmap: ImageBitmap;
        /**
         * Promise when loading.
         *
         * @default null
         */
        private _load;
        /** When process is completed */
        private _process;
        /**
         * @param source - image source or URL
         * @param options
         * @param {boolean} [options.autoLoad=true] - start loading process
         * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - whether its required to create
         *        a bitmap before upload
         * @param {boolean} [options.crossorigin=true] - Load image using cross origin
         * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Premultiply image alpha in bitmap
         */
        constructor(source: HTMLImageElement | string, options?: IImageResourceOptions);
        /**
         * Returns a promise when image will be loaded and processed.
         *
         * @param createBitmap - whether process image into bitmap
         */
        load(createBitmap?: boolean): Promise<ImageResource>;
        /**
         * Called when we need to convert image into BitmapImage.
         * Can be called multiple times, real promise is cached inside.
         *
         * @return - Cached promise to fill that bitmap
         */
        process(): Promise<ImageResource>;
        /**
         * Upload the image resource to GPU.
         *
         * @param renderer - Renderer to upload to
         * @param baseTexture - BaseTexture for this resource
         * @param glTexture - GLTexture to use
         * @returns {boolean} true is success
         */
        upload(renderer: Renderer, baseTexture: BaseTexture, glTexture: GLTexture): boolean;
        /** Destroys this resource. */
        dispose(): void;
        /**
         * Used to auto-detect the type of resource.
         *
         * @param {*} source - The source object
         * @return {boolean} `true` if source is string or HTMLImageElement
         */
        static test(source: unknown): boolean;
    }

    export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;

    export interface IMaskTarget extends IFilterTarget {
        renderable: boolean;
        isSprite?: boolean;
        worldTransform: Matrix;
        isFastRect?(): boolean;
        getBounds(skipUpdate?: boolean): Rectangle;
        render(renderer: Renderer): void;
    }

    /**
     * Collection of installed resource types, class must extend {@link PIXI.Resource}.
     * @example
     * class CustomResource extends PIXI.Resource {
     *   // MUST have source, options constructor signature
     *   // for auto-detected resources to be created.
     *   constructor(source, options) {
     *     super();
     *   }
     *   upload(renderer, baseTexture, glTexture) {
     *     // upload with GL
     *     return true;
     *   }
     *   // used to auto-detect resource
     *   static test(source, extension) {
     *     return extension === 'xyz'|| source instanceof SomeClass;
     *   }
     * }
     * // Install the new resource type
     * PIXI.INSTALLED.push(CustomResource);
     *
     * @memberof PIXI
     * @type {Array<PIXI.IResourcePlugin>}
     * @static
     * @readonly
     */
    export const INSTALLED: Array<IResourcePlugin<any, any>>;

    /**
     * Interface for Container to interface with Renderer.
     * @memberof PIXI
     */
    export interface IRenderableContainer extends IRenderableObject {
        /** Get Local bounds for container */
        getLocalBounds(rect?: Rectangle, skipChildrenUpdate?: boolean): Rectangle;
    }

    /**
     * Interface for DisplayObject to interface with Renderer.
     * The minimum APIs needed to implement a renderable object.
     * @memberof PIXI
     */
    export interface IRenderableObject {
        /** Object must have a parent container */
        parent: IRenderableContainer;
        /** Before method for transform updates */
        enableTempParent(): IRenderableContainer;
        /** Update the transforms */
        updateTransform(): void;
        /** After method for transform updates */
        disableTempParent(parent: IRenderableContainer): void;
        /** Render object directly */
        render(renderer: Renderer): void;
    }

    export interface IRendererOptions extends GlobalMixins.IRendererOptions {
        width?: number;
        height?: number;
        view?: HTMLCanvasElement;
        useContextAlpha?: boolean | 'notMultiplied';
        /**
         * Use `backgroundAlpha` instead.
         * @deprecated
         */
        transparent?: boolean;
        autoDensity?: boolean;
        antialias?: boolean;
        resolution?: number;
        preserveDrawingBuffer?: boolean;
        clearBeforeRender?: boolean;
        backgroundColor?: number;
        backgroundAlpha?: number;
        powerPreference?: WebGLPowerPreference;
        context?: IRenderingContext;
    }

    export interface IRendererOptionsAuto extends IRendererOptions {
        forceCanvas?: boolean;
    }

    export interface IRendererPlugin {
        destroy(): void;
    }

    export interface IRendererPluginConstructor {
        new(renderer: Renderer, options?: any): IRendererPlugin;
    }

    export interface IRendererPlugins {
        [key: string]: any;
    }

    export interface IRendererRenderOptions {
        renderTexture?: RenderTexture;
        clear?: boolean;
        transform?: Matrix;
        skipUpdateTransform?: boolean;
    }

    /**
     * Mixed WebGL1/WebGL2 Rendering Context.
     * Either its WebGL2, either its WebGL1 with PixiJS polyfills on it
     */
    export interface IRenderingContext extends WebGL2RenderingContext {
    }

    /**
     * Shape of supported resource plugins
     *
     * @memberof PIXI
     */
    export interface IResourcePlugin<R, RO> {
        test(source: unknown, extension: string): boolean;
        new(source: any, options?: RO): R;
    }

    export type IResourcePluginOptions = {
        [key: string]: any;
    };

    export interface ISpriteMaskFilter extends Filter {
        maskSprite: IMaskTarget;
    }

    export interface ISpriteMaskTarget extends IMaskTarget {
        _texture: Texture;
        worldAlpha: number;
        anchor: Point;
    }

    export interface ISupportDict {
        uint32Indices: boolean;
    }

    export interface ISVGResourceOptions {
        source?: string;
        scale?: number;
        width?: number;
        height?: number;
        autoLoad?: boolean;
        crossorigin?: boolean | string;
    }

    /**
     * Interface for systems used by the {@link PIXI.Renderer}.
     * @memberof PIXI
     */
    export interface ISystem {
        /**
         * Generic destroy methods to be overridden by the subclass
         */
        destroy(): void;
    }

    /**
     * Types for system and pipe classes.
     *
     * @ignore
     */
    export interface ISystemConstructor<R = Renderer> {
        new(renderer: R): ISystem;
    }

    /**
     * PixiJS classes use this type instead of ArrayBuffer and typed arrays
     * to support expressions like `geometry.buffers[0].data[0] = position.x`.
     *
     * Gives access to indexing and `length` field
     *
     * @popelyshev: If data is actually ArrayBuffer and throws Exception on indexing - its user problem :)
     */
    export interface ITypedArray extends IArrayBuffer {
        readonly length: number;
        [index: number]: number;
        readonly BYTES_PER_ELEMENT: number;
    }

    export interface IUniformData {
        index: number;
        type: string;
        size: number;
        isArray: boolean;
        value: any;
        name: string;
    }

    export interface IUniformParser {
        test(data: unknown, uniform: any): boolean;
        code(name: string, uniform: any): string;
        codeUbo?(name: string, uniform: any): string;
    }

    export interface IUnloadableTexture {
        _texture: Texture | RenderTexture;
        children: IUnloadableTexture[];
    }

    export interface IVideoResourceOptions {
        autoLoad?: boolean;
        autoPlay?: boolean;
        updateFPS?: number;
        crossorigin?: boolean | string;
    }

    export interface IVideoResourceOptionsElement {
        src: string;
        mime: string;
    }

    /**
     * Component for masked elements.
     *
     * Holds mask mode and temporary data about current mask.
     *
     * @memberof PIXI
     */
    export class MaskData {
        /** Mask type */
        type: MASK_TYPES;
        /**
         * Whether we know the mask type beforehand
         * @default true
         */
        autoDetect: boolean;
        /**
         * Which element we use to mask
         * @member {PIXI.DisplayObject}
         */
        maskObject: IMaskTarget;
        /** Whether it belongs to MaskSystem pool */
        pooled: boolean;
        /** Indicator of the type (always true for {@link MaskData} objects) */
        isMaskData: boolean;
        /**
         * Resolution of the sprite mask filter.
         * If set to `null` or `0`, the resolution of the current render target is used.
         * @default null
         */
        resolution: number;
        /**
         * Number of samples of the sprite mask filter.
         * If set to `null`, the sample count of the current render target is used.
         * @default PIXI.settings.FILTER_MULTISAMPLE
         */
        multisample: MSAA_QUALITY;
        /** If enabled is true the mask is applied, if false it will not. */
        enabled: boolean;
        /**
         * The sprite mask filter wrapped in an array.
         * @private
         */
        _filters: any[];
        /**
         * Stencil counter above the mask in stack
         * @private
         */
        _stencilCounter: number;
        /**
         * Scissor counter above the mask in stack
         * @private
         */
        _scissorCounter: number;
        /**
         * Scissor operation above the mask in stack.
         * Null if _scissorCounter is zero, rectangle instance if positive.
         */
        _scissorRect: Rectangle;
        /**
         * pre-computed scissor rect
         * does become _scissorRect when mask is actually pushed
         */
        _scissorRectLocal: Rectangle;
        /**
         * Targeted element. Temporary variable set by MaskSystem
         * @member {PIXI.DisplayObject}
         * @private
         */
        _target: IMaskTarget;
        /**
         * Create MaskData
         *
         * @param {PIXI.DisplayObject} [maskObject=null] - object that describes the mask
         */
        constructor(maskObject?: IMaskTarget);
        /**
         * The sprite mask filter.
         * If set to `null`, the default sprite mask filter is used.
         * @default null
         */
        get filter(): any;
        set filter(value: any);
        /** Resets the mask data after popMask(). */
        reset(): void;
        /** Copies counters from maskData above, called from pushMask(). */
        copyCountersOrReset(maskAbove?: MaskData): void;
    }

    /**
     * System plugin to the renderer to manage masks.
     *
     * There are three built-in types of masking:
     * * **Scissor Masking**: Scissor masking discards pixels that are outside of a rectangle called the scissor box. It is
     *  the most performant as the scissor test is inexpensive. However, it can only be used when the mask is rectangular.
     * * **Stencil Masking**: Stencil masking discards pixels that don't overlap with the pixels rendered into the stencil
     *  buffer. It is the next fastest option as it does not require rendering into a separate framebuffer. However, it does
     *  cause the mask to be rendered **twice** for each masking operation; hence, minimize the rendering cost of your masks.
     * * **Sprite Mask Filtering**: Sprite mask filtering discards pixels based on the red channel of the sprite-mask's
     *  texture. (Generally, the masking texture is grayscale). Using advanced techniques, you might be able to embed this
     *  type of masking in a custom shader - and hence, bypassing the masking system fully for performance wins.
     *
     * The best type of masking is auto-detected when you `push` one. To use scissor masking, you must pass in a `Graphics`
     * object with just a rectangle drawn.
     *
     * ## Mask Stacks
     *
     * In the scene graph, masks can be applied recursively, i.e. a mask can be applied during a masking operation. The mask
     * stack stores the currently applied masks in order. Each {@link PIXI.BaseRenderTexture} holds its own mask stack, i.e.
     * when you switch render-textures, the old masks only applied when you switch back to rendering to the old render-target.
     *
     * @memberof PIXI
     */
    export class MaskSystem implements ISystem {
        /**
         * Flag to enable scissor masking.
         *
         * @default true
         */
        enableScissor: boolean;
        /** Pool of used sprite mask filters. */
        protected readonly alphaMaskPool: Array<SpriteMaskFilter[]>;
        /**
         * Current index of alpha mask pool.
         * @default 0
         * @readonly
         */
        protected alphaMaskIndex: number;
        /** Pool of mask data. */
        private readonly maskDataPool;
        private maskStack;
        private renderer;
        /**
         * @param renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * Changes the mask stack that is used by this System.
         *
         * @param maskStack - The mask stack
         */
        setMaskStack(maskStack: Array<MaskData>): void;
        /**
         * Enables the mask and appends it to the current mask stack.
         *
         * NOTE: The batch renderer should be flushed beforehand to prevent pending renders from being masked.
         *
         * @param {PIXI.DisplayObject} target - Display Object to push the mask to
         * @param {PIXI.MaskData|PIXI.Sprite|PIXI.Graphics|PIXI.DisplayObject} maskData - The masking data.
         */
        push(target: IMaskTarget, maskDataOrTarget: MaskData | IMaskTarget): void;
        /**
         * Removes the last mask from the mask stack and doesn't return it.
         *
         * NOTE: The batch renderer should be flushed beforehand to render the masked contents before the mask is removed.
         *
         * @param {PIXI.DisplayObject} target - Display Object to pop the mask from
         */
        pop(target: IMaskTarget): void;
        /** Sets type of MaskData based on its maskObject. */
        detect(maskData: MaskData): void;
        /**
         * Applies the Mask and adds it to the current filter stack.
         *
         * @param maskData - Sprite to be used as the mask.
         */
        pushSpriteMask(maskData: MaskData): void;
        /**
         * Removes the last filter from the filter stack and doesn't return it.
         *
         * @param maskData - Sprite to be used as the mask.
         */
        popSpriteMask(maskData: MaskData): void;
        destroy(): void;
    }

    /**
     * Base for a common object renderer that can be used as a
     * system renderer plugin.
     *
     * @memberof PIXI
     */
    export class ObjectRenderer implements ISystem {
        /** The renderer this manager works for. */
        protected renderer: Renderer;
        /**
         * @param renderer - The renderer this manager works for.
         */
        constructor(renderer: Renderer);
        /**
         * Stub method that should be used to empty the current
         * batch by rendering objects now.
         */
        flush(): void;
        /**
         * Generic destruction method that frees all resources. This
         * should be called by subclasses.
         */
        destroy(): void;
        /**
         * Stub method that initializes any state required before
         * rendering starts. It is different from the `prerender`
         * signal, which occurs every frame, in that it is called
         * whenever an object requests _this_ renderer specifically.
         */
        start(): void;
        /**
         * Stops the renderer. It should free up any state and
         * become dormant.
         */
        stop(): void;
        /**
         * Keeps the object to render. It doesn't have to be
         * rendered immediately.
         *
         * @param {PIXI.DisplayObject} object - The object to render.
         */
        render(_object: any): void;
    }

    /**
     * Helper class to create a shader program.
     *
     * @memberof PIXI
     */
    export class Program {
        id: number;
        /** Source code for the vertex shader. */
        vertexSrc: string;
        /** Source code for the fragment shader. */
        fragmentSrc: string;
        nameCache: any;
        glPrograms: {
            [key: number]: GLProgram;
        };
        syncUniforms: any;
        /** Assigned when a program is first bound to the shader system. */
        attributeData: {
            [key: string]: IAttributeData;
        };
        /** Assigned when a program is first bound to the shader system. */
        uniformData: {
            [key: string]: IUniformData;
        };
        /**
         * @param vertexSrc - The source of the vertex shader.
         * @param fragmentSrc - The source of the fragment shader.
         * @param name - Name for shader
         */
        constructor(vertexSrc?: string, fragmentSrc?: string, name?: string);
        /**
         * The default vertex shader source.
         *
         * @constant
         */
        static get defaultVertexSrc(): string;
        /**
         * The default fragment shader source.
         *
         * @constant
         */
        static get defaultFragmentSrc(): string;
        /**
         * A short hand function to create a program based of a vertex and fragment shader.
         *
         * This method will also check to see if there is a cached program.
         *
         * @param vertexSrc - The source of the vertex shader.
         * @param fragmentSrc - The source of the fragment shader.
         * @param name - Name for shader
         * @returns A shiny new PixiJS shader program!
         */
        static from(vertexSrc?: string, fragmentSrc?: string, name?: string): Program;
    }

    /**
     * System plugin to the renderer to manage the projection matrix.
     *
     * The `projectionMatrix` is a global uniform provided to all shaders. It is used to transform points in world space to
     * normalized device coordinates.
     *
     * @memberof PIXI
     */
    export class ProjectionSystem implements ISystem {
        /**
         * The destination frame used to calculate the current projection matrix.
         *
         * The destination frame is the rectangle in the render-target into which contents are rendered. If rendering
         * to the screen, the origin is on the top-left. If rendering to a framebuffer, the origin is on the
         * bottom-left. This "flipping" phenomenon is because of WebGL convention for (shader) texture coordinates, where
         * the bottom-left corner is (0,0). It allows display-objects to map their (0,0) position in local-space (top-left)
         * to (0,0) in texture space (bottom-left). In other words, a sprite's top-left corner actually renders the
         * texture's bottom-left corner. You will also notice this when using a tool like SpectorJS to view your textures
         * at runtime.
         *
         * The destination frame's dimensions (width,height) should be equal to the source frame. This is because,
         * otherwise, the contents will be scaled to fill the destination frame. Similarly, the destination frame's (x,y)
         * coordinates are (0,0) unless you know what you're doing.
         *
         * @readonly
         */
        destinationFrame: Rectangle;
        /**
         * The source frame used to calculate the current projection matrix.
         *
         * The source frame is the rectangle in world space containing the contents to be rendered.
         *
         * @readonly
         */
        sourceFrame: Rectangle;
        /**
         * Default destination frame
         *
         * This is not used internally. It is not advised to use this feature specifically unless you know what
         * you're doing. The `update` method will default to this frame if you do not pass the destination frame.
         *
         * @readonly
         */
        defaultFrame: Rectangle;
        /**
         * Projection matrix
         *
         * This matrix can be used to transform points from world space to normalized device coordinates, and is calculated
         * from the sourceFrame → destinationFrame mapping provided.
         *
         * The renderer's `globalUniforms` keeps a reference to this, and so it is available for all shaders to use as a
         * uniform.
         *
         * @readonly
         */
        projectionMatrix: Matrix;
        /**
         * A transform to be appended to the projection matrix.
         *
         * This can be used to transform points in world-space one last time before they are outputted by the shader. You can
         * use to rotate the whole scene, for example. Remember to clear it once you've rendered everything.
         *
         * @member {PIXI.Matrix}
         */
        transform: Matrix;
        private renderer;
        /** @param renderer - The renderer this System works for. */
        constructor(renderer: Renderer);
        /**
         * Updates the projection-matrix based on the sourceFrame → destinationFrame mapping provided.
         *
         * NOTE: It is expected you call `renderer.framebuffer.setViewport(destinationFrame)` after this. This is because
         * the framebuffer viewport converts shader vertex output in normalized device coordinates to window coordinates.
         *
         * NOTE-2: {@link RenderTextureSystem#bind} updates the projection-matrix when you bind a render-texture. It is expected
         * that you dirty the current bindings when calling this manually.
         *
         * @param destinationFrame - The rectangle in the render-target to render the contents into. If rendering to the canvas,
         *  the origin is on the top-left; if rendering to a render-texture, the origin is on the bottom-left.
         * @param sourceFrame - The rectangle in world space that contains the contents being rendered.
         * @param resolution - The resolution of the render-target, which is the ratio of
         *  world-space (or CSS) pixels to physical pixels.
         * @param root - Whether the render-target is the screen. This is required because rendering to textures
         *  is y-flipped (i.e. upside down relative to the screen).
         */
        update(destinationFrame: Rectangle, sourceFrame: Rectangle, resolution: number, root: boolean): void;
        /**
         * Calculates the `projectionMatrix` to map points inside `sourceFrame` to inside `destinationFrame`.
         *
         * @param destinationFrame - The destination frame in the render-target.
         * @param sourceFrame - The source frame in world space.
         * @param resolution - The render-target's resolution, i.e. ratio of CSS to physical pixels.
         * @param root - Whether rendering into the screen. Otherwise, if rendering to a framebuffer, the projection
         *  is y-flipped.
         */
        calculateProjection(_destinationFrame: Rectangle, sourceFrame: Rectangle, _resolution: number, root: boolean): void;
        /**
         * Sets the transform of the active render target to the given matrix.
         *
         * @param matrix - The transformation matrix
         */
        setTransform(_matrix: Matrix): void;
        destroy(): void;
    }

    /**
     * Helper class to create a quad
     *
     * @class
     * @memberof PIXI
     */
    export class Quad extends Geometry {
        constructor();
    }

    /**
     * Helper class to create a quad with uvs like in v4
     *
     * @class
     * @memberof PIXI
     * @extends PIXI.Geometry
     */
    export class QuadUv extends Geometry {
        vertexBuffer: Buffer_2;
        uvBuffer: Buffer_2;
        vertices: Float32Array;
        uvs: Float32Array;
        constructor();
        /**
         * Maps two Rectangle to the quad.
         *
         * @param {PIXI.Rectangle} targetTextureFrame - the first rectangle
         * @param {PIXI.Rectangle} destinationFrame - the second rectangle
         * @return {PIXI.Quad} Returns itself.
         */
        map(targetTextureFrame: Rectangle, destinationFrame: Rectangle): this;
        /**
         * legacy upload method, just marks buffers dirty
         * @returns {PIXI.QuadUv} Returns itself.
         */
        invalidate(): this;
    }

    /**
     * The Renderer draws the scene and all its content onto a WebGL enabled canvas.
     *
     * This renderer should be used for browsers that support WebGL.
     *
     * This renderer works by automatically managing WebGLBatchesm, so no need for Sprite Batches or Sprite Clouds.
     * Don't forget to add the view to your DOM or you will not see anything!
     *
     * Renderer is composed of systems that manage specific tasks. The following systems are added by default
     * whenever you create a renderer:
     *
     * | System                               | Description                                                                   |
     * | ------------------------------------ | ----------------------------------------------------------------------------- |
     * | {@link PIXI.BatchSystem}             | This manages object renderers that defer rendering until a flush.             |
     * | {@link PIXI.ContextSystem}           | This manages the WebGL context and extensions.                                |
     * | {@link PIXI.EventSystem}             | This manages UI events.                                                       |
     * | {@link PIXI.FilterSystem}            | This manages the filtering pipeline for post-processing effects.              |
     * | {@link PIXI.FramebufferSystem}       | This manages framebuffers, which are used for offscreen rendering.            |
     * | {@link PIXI.GeometrySystem}          | This manages geometries & buffers, which are used to draw object meshes.      |
     * | {@link PIXI.MaskSystem}              | This manages masking operations.                                              |
     * | {@link PIXI.ProjectionSystem}        | This manages the `projectionMatrix`, used by shaders to get NDC coordinates.  |
     * | {@link PIXI.RenderTextureSystem}     | This manages render-textures, which are an abstraction over framebuffers.     |
     * | {@link PIXI.ScissorSystem}           | This handles scissor masking, and is used internally by {@link MaskSystem}    |
     * | {@link PIXI.ShaderSystem}            | This manages shaders, programs that run on the GPU to calculate 'em pixels.   |
     * | {@link PIXI.StateSystem}             | This manages the WebGL state variables like blend mode, depth testing, etc.   |
     * | {@link PIXI.StencilSystem}           | This handles stencil masking, and is used internally by {@link MaskSystem}    |
     * | {@link PIXI.TextureSystem}           | This manages textures and their resources on the GPU.                         |
     * | {@link PIXI.TextureGCSystem}         | This will automatically remove textures from the GPU if they are not used.    |
     *
     * The breadth of the API surface provided by the renderer is contained within these systems.
     *
     * @memberof PIXI
     */
    export class Renderer extends AbstractRenderer {
        /**
         * WebGL context, set by {@link PIXI.ContextSystem this.context}.
         *
         * @readonly
         * @member {WebGLRenderingContext}
         */
        gl: IRenderingContext;
        /** Global uniforms */
        globalUniforms: UniformGroup;
        /** Unique UID assigned to the renderer's WebGL context. */
        CONTEXT_UID: number;
        /**
         * Flag if we are rendering to the screen vs renderTexture
         *
         * @readonly
         * @default true
         */
        renderingToScreen: boolean;
        /**
         * The number of msaa samples of the canvas.
         * @readonly
         */
        multisample: MSAA_QUALITY;
        /**
         * Mask system instance
         * @readonly
         */
        mask: MaskSystem;
        /**
         * Context system instance
         * @readonly
         */
        context: ContextSystem;
        /**
         * State system instance
         * @readonly
         */
        state: StateSystem;
        /**
         * Shader system instance
         * @readonly
         */
        shader: ShaderSystem;
        /**
         * Texture system instance
         * @readonly
         */
        texture: TextureSystem;
        /**
         * Buffer system instance
         * @readonly
         */
        buffer: BufferSystem;
        /**
         * Geometry system instance
         * @readonly
         */
        geometry: GeometrySystem;
        /**
         * Framebuffer system instance
         * @readonly
         */
        framebuffer: FramebufferSystem;
        /**
         * Scissor system instance
         * @readonly
         */
        scissor: ScissorSystem;
        /**
         * Stencil system instance
         * @readonly
         */
        stencil: StencilSystem;
        /**
         * Projection system instance
         * @readonly
         */
        projection: ProjectionSystem;
        /**
         * Texture garbage collector system instance
         * @readonly
         */
        textureGC: TextureGCSystem;
        /**
         * Filter system instance
         * @readonly
         */
        filter: FilterSystem;
        /**
         * RenderTexture system instance
         * @readonly
         */
        renderTexture: RenderTextureSystem;
        /**
         * Batch system instance
         * @readonly
         */
        batch: BatchSystem;
        /**
         * Internal signal instances of **runner**, these
         * are assigned to each system created.
         * @see PIXI.Runner
         * @name runners
         * @private
         * @type {object}
         * @readonly
         * @property {PIXI.Runner} destroy - Destroy runner
         * @property {PIXI.Runner} contextChange - Context change runner
         * @property {PIXI.Runner} reset - Reset runner
         * @property {PIXI.Runner} update - Update runner
         * @property {PIXI.Runner} postrender - Post-render runner
         * @property {PIXI.Runner} prerender - Pre-render runner
         * @property {PIXI.Runner} resize - Resize runner
         */
        runners: {
            [key: string]: Runner;
        };
        /**
         * Create renderer if WebGL is available. Overrideable
         * by the **@pixi/canvas-renderer** package to allow fallback.
         * throws error if WebGL is not available.
         *
         * @private
         */
        static create(options?: IRendererOptions): AbstractRenderer;
        /**
         * @param [options] - The optional renderer parameters.
         * @param {number} [options.width=800] - The width of the screen.
         * @param {number} [options.height=600] - The height of the screen.
         * @param {HTMLCanvasElement} [options.view] - The canvas to use as a view, optional.
         * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
         *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
         *   canvas needs to be opaque, possibly for performance reasons on some older devices.
         * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
         *   resolutions other than 1.
         * @param {boolean} [options.antialias=false] - Sets antialias. If not available natively then FXAA
         *  antialiasing is used.
         * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the renderer.
         * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear
         *  the canvas or not before the new render pass. If you wish to set this to false, you *must* set
         *  preserveDrawingBuffer to `true`.
         * @param {boolean} [options.preserveDrawingBuffer=false] - Enables drawing buffer preservation,
         *  enable this if you need to call toDataUrl on the WebGL context.
         * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
         *  (shown if not transparent).
         * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
         * @param {string} [options.powerPreference] - Parameter passed to WebGL context, set to "high-performance"
         *  for devices with dual graphics card.
         * @param {object} [options.context] - If WebGL context already exists, all parameters must be taken from it.
         */
        constructor(options?: IRendererOptions);
        protected contextChange(): void;
        /**
         * Add a new system to the renderer.
         * @param ClassRef - Class reference
         * @param [name] - Property name for system, if not specified
         *        will use a static `name` property on the class itself. This
         *        name will be assigned as s property on the Renderer so make
         *        sure it doesn't collide with properties on Renderer.
         * @return Return instance of renderer
         */
        addSystem(ClassRef: ISystemConstructor, name: string): this;
        /**
         * Renders the object to its WebGL view.
         *
         * @param displayObject - The object to be rendered.
         * @param {object} [options] - Object to use for render options.
         * @param {PIXI.RenderTexture} [options.renderTexture] - The render texture to render to.
         * @param {boolean} [options.clear=true] - Should the canvas be cleared before the new render.
         * @param {PIXI.Matrix} [options.transform] - A transform to apply to the render texture before rendering.
         * @param {boolean} [options.skipUpdateTransform=false] - Should we skip the update transform pass?
         */
        render(displayObject: IRenderableObject, options?: IRendererRenderOptions): void;
        /**
         * Please use the `option` render arguments instead.
         *
         * @deprecated Since 6.0.0
         * @param displayObject
         * @param renderTexture
         * @param clear
         * @param transform
         * @param skipUpdateTransform
         */
        render(displayObject: IRenderableObject, renderTexture?: RenderTexture, clear?: boolean, transform?: Matrix, skipUpdateTransform?: boolean): void;
        /**
         * @override
         * @ignore
         */
        generateTexture(displayObject: IRenderableObject, options?: IGenerateTextureOptions | SCALE_MODES, resolution?: number, region?: Rectangle): RenderTexture;
        /**
         * Resizes the WebGL view to the specified width and height.
         *
         * @param desiredScreenWidth - The desired width of the screen.
         * @param desiredScreenHeight - The desired height of the screen.
         */
        resize(desiredScreenWidth: number, desiredScreenHeight: number): void;
        /**
         * Resets the WebGL state so you can render things however you fancy!
         *
         * @return Returns itself.
         */
        reset(): this;
        /** Clear the frame buffer. */
        clear(): void;
        /**
         * Removes everything from the renderer (event listeners, spritebatch, etc...)
         *
         * @param [removeView=false] - Removes the Canvas element from the DOM.
         *  See: https://github.com/pixijs/pixi.js/issues/2233
         */
        destroy(removeView?: boolean): void;
        /**
         * Please use `plugins.extract` instead.
         * @member {PIXI.Extract} extract
         * @deprecated since 6.0.0
         * @readonly
         */
        get extract(): any;
        /**
         * Collection of installed plugins. These are included by default in PIXI, but can be excluded
         * by creating a custom build. Consult the README for more information about creating custom
         * builds and excluding plugins.
         *
         * @readonly
         * @property {PIXI.AccessibilityManager} accessibility Support tabbing interactive elements.
         * @property {PIXI.Extract} extract Extract image data from renderer.
         * @property {PIXI.InteractionManager} interaction Handles mouse, touch and pointer events.
         * @property {PIXI.ParticleRenderer} particle Renderer for ParticleContainer objects.
         * @property {PIXI.Prepare} prepare Pre-render display objects.
         * @property {PIXI.BatchRenderer} batch Batching of Sprite, Graphics and Mesh objects.
         * @property {PIXI.TilingSpriteRenderer} tilingSprite Renderer for TilingSprite objects.
         */
        static __plugins: IRendererPlugins;
        /**
         * Adds a plugin to the renderer.
         *
         * @param pluginName - The name of the plugin.
         * @param ctor - The constructor function or class for the plugin.
         */
        static registerPlugin(pluginName: string, ctor: IRendererPluginConstructor): void;
    }

    /**
     * A RenderTexture is a special texture that allows any PixiJS display object to be rendered to it.
     *
     * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded
     * otherwise black rectangles will be drawn instead.
     *
     * __Hint-2__: The actual memory allocation will happen on first render.
     * You shouldn't create renderTextures each frame just to delete them after, try to reuse them.
     *
     * A RenderTexture takes a snapshot of any Display Object given to its render method. For example:
     *
     * ```js
     * let renderer = PIXI.autoDetectRenderer();
     * let renderTexture = PIXI.RenderTexture.create({ width: 800, height: 600 });
     * let sprite = PIXI.Sprite.from("spinObj_01.png");
     *
     * sprite.position.x = 800/2;
     * sprite.position.y = 600/2;
     * sprite.anchor.x = 0.5;
     * sprite.anchor.y = 0.5;
     *
     * renderer.render(sprite, {renderTexture});
     * ```
     * Note that you should not create a new renderer, but reuse the same one as the rest of the application.
     *
     * The Sprite in this case will be rendered using its local transform. To render this sprite at 0,0
     * you can clear the transform
     *
     * ```js
     *
     * sprite.setTransform()
     *
     * let renderTexture = new PIXI.RenderTexture.create({ width: 100, height: 100 });
     *
     * renderer.render(sprite, {renderTexture});  // Renders to center of RenderTexture
     * ```
     *
     * @memberof PIXI
     */
    export class RenderTexture extends Texture {
        baseTexture: BaseRenderTexture;
        /**
         * Stores `sourceFrame` when this texture is inside current filter stack.
         *
         * You can read it inside filters.
         *
         * @readonly
         */
        filterFrame: Rectangle | null;
        /**
         * The key for pooled texture of FilterSystem.
         *
         * @see PIXI.RenderTexturePool
         */
        filterPoolKey: string | number | null;
        /**
         * @param baseRenderTexture - The base texture object that this texture uses.
         * @param frame - The rectangle frame of the texture to show.
         */
        constructor(baseRenderTexture: BaseRenderTexture, frame?: Rectangle);
        /**
         * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
         *
         * @readonly
         */
        get framebuffer(): Framebuffer;
        /**
         * Shortcut to `this.framebuffer.multisample`.
         *
         * @default PIXI.MSAA_QUALITY.NONE
         */
        get multisample(): MSAA_QUALITY;
        set multisample(value: MSAA_QUALITY);
        /**
         * Resizes the RenderTexture.
         *
         * @param desiredWidth - The desired width to resize to.
         * @param desiredHeight - The desired height to resize to.
         * @param resizeBaseTexture - Should the baseTexture.width and height values be resized as well?
         */
        resize(desiredWidth: number, desiredHeight: number, resizeBaseTexture?: boolean): void;
        /**
         * Changes the resolution of baseTexture, but does not change framebuffer size.
         *
         * @param resolution - The new resolution to apply to RenderTexture
         */
        setResolution(resolution: number): void;
        /**
         * Use the object-based construction instead.
         *
         * @deprecated since 6.0.0
         * @param {number} [width]
         * @param {number} [height]
         * @param {PIXI.SCALE_MODES} [scaleMode=PIXI.settings.SCALE_MODE]
         * @param {number} [resolution=PIXI.settings.FILTER_RESOLUTION]
         */
        static create(width: number, height: number, scaleMode?: SCALE_MODES, resolution?: number): RenderTexture;
        /**
         * A short hand way of creating a render texture.
         *
         * @param options - Options
         * @param {number} [options.width=100] - The width of the render texture
         * @param {number} [options.height=100] - The height of the render texture
         * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES}
         *    for possible values
         * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the texture
         *    being generated
         * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer
         * @return The new render texture
         */
        static create(options?: IBaseTextureOptions): RenderTexture;
    }

    /**
     * Texture pool, used by FilterSystem and plugins.
     *
     * Stores collection of temporary pow2 or screen-sized renderTextures
     *
     * If you use custom RenderTexturePool for your filters, you can use methods
     * `getFilterTexture` and `returnFilterTexture` same as in
     *
     * @memberof PIXI
     */
    export class RenderTexturePool {
        textureOptions: IBaseTextureOptions;
        /**
         * Allow renderTextures of the same size as screen, not just pow2
         *
         * Automatically sets to true after `setScreenSize`
         *
         * @default false
         */
        enableFullScreen: boolean;
        texturePool: {
            [x in string | number]: RenderTexture[];
        };
        private _pixelsWidth;
        private _pixelsHeight;
        /**
         * @param textureOptions - options that will be passed to BaseRenderTexture constructor
         * @param {PIXI.SCALE_MODES} [textureOptions.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
         */
        constructor(textureOptions?: IBaseTextureOptions);
        /**
         * Creates texture with params that were specified in pool constructor.
         *
         * @param realWidth - Width of texture in pixels.
         * @param realHeight - Height of texture in pixels.
         * @param multisample - Number of samples of the framebuffer.
         */
        createTexture(realWidth: number, realHeight: number, multisample?: MSAA_QUALITY): RenderTexture;
        /**
         * Gets a Power-of-Two render texture or fullScreen texture
         *
         * @param minWidth - The minimum width of the render texture.
         * @param minHeight - The minimum height of the render texture.
         * @param resolution - The resolution of the render texture.
         * @param multisample - Number of samples of the render texture.
         * @return The new render texture.
         */
        getOptimalTexture(minWidth: number, minHeight: number, resolution?: number, multisample?: MSAA_QUALITY): RenderTexture;
        /**
         * Gets extra texture of the same size as input renderTexture
         *
         * `getFilterTexture(input, 0.5)` or `getFilterTexture(0.5, input)`
         *
         * @param input - renderTexture from which size and resolution will be copied
         * @param resolution - override resolution of the renderTexture
         *  It overrides, it does not multiply
         * @param multisample - number of samples of the renderTexture
         * @returns
         */
        getFilterTexture(input: RenderTexture, resolution?: number, multisample?: MSAA_QUALITY): RenderTexture;
        /**
         * Place a render texture back into the pool.
         *
         * @param renderTexture - The renderTexture to free
         */
        returnTexture(renderTexture: RenderTexture): void;
        /**
         * Alias for returnTexture, to be compliant with FilterSystem interface.
         *
         * @param renderTexture - The renderTexture to free
         */
        returnFilterTexture(renderTexture: RenderTexture): void;
        /**
         * Clears the pool.
         *
         * @param destroyTextures - Destroy all stored textures.
         */
        clear(destroyTextures?: boolean): void;
        /**
         * If screen size was changed, drops all screen-sized textures,
         * sets new screen size, sets `enableFullScreen` to true
         *
         * Size is measured in pixels, `renderer.view` can be passed here, not `renderer.screen`
         *
         * @param size - Initial size of screen.
         */
        setScreenSize(size: ISize): void;
        /**
         * Key that is used to store fullscreen renderTextures in a pool
         *
         * @constant
         */
        static SCREEN_KEY: number;
    }

    /**
     * System plugin to the renderer to manage render textures.
     *
     * Should be added after FramebufferSystem
     *
     * ### Frames
     *
     * The `RenderTextureSystem` holds a sourceFrame → destinationFrame projection. The following table explains the different
     * coordinate spaces used:
     *
     * | Frame                  | Description                                                      | Coordinate System                                       |
     * | ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
     * | sourceFrame            | The rectangle inside of which display-objects are being rendered | **World Space**: The origin on the top-left             |
     * | destinationFrame       | The rectangle in the render-target (canvas or texture) into which contents should be rendered | If rendering to the canvas, this is in screen space and the origin is on the top-left. If rendering to a render-texture, this is in its base-texture's space with the origin on the bottom-left.  |
     * | viewportFrame          | The framebuffer viewport corresponding to the destination-frame  | **Window Coordinates**: The origin is always on the bottom-left. |
     *
     * @memberof PIXI
     */
    export class RenderTextureSystem implements ISystem {
        /** The clear background color as RGBA. */
        clearColor: number[];
        /**
         * List of masks for the {@link PIXI.StencilSystem}.
         *
         * @readonly
         */
        defaultMaskStack: Array<MaskData>;
        /**
         * Render texture currently bound. {@code null} if rendering to the canvas.
         *
         * @readonly
         */
        current: RenderTexture | null;
        /**
         * The source frame for the render-target's projection mapping.
         *
         * See {@link PIXI.ProjectionSystem#sourceFrame} for more details
         */
        readonly sourceFrame: Rectangle;
        /**
         * The destination frame for the render-target's projection mapping.
         *
         * See {@link PIXI.Projection#destinationFrame} for more details.
         */
        readonly destinationFrame: Rectangle;
        /**
         * The viewport frame for the render-target's viewport binding. This is equal to the destination-frame
         * for render-textures, while it is y-flipped when rendering to the screen (i.e. its origin is always on
         * the bottom-left).
         */
        readonly viewportFrame: Rectangle;
        private renderer;
        /**
         * @param renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * Bind the current render texture.
         *
         * @param renderTexture - RenderTexture to bind, by default its `null` - the screen.
         * @param sourceFrame - Part of world that is mapped to the renderTexture.
         * @param destinationFrame - Part of renderTexture, by default it has the same size as sourceFrame.
         */
        bind(renderTexture?: RenderTexture, sourceFrame?: Rectangle, destinationFrame?: Rectangle): void;
        /**
         * Erases the render texture and fills the drawing area with a colour.
         *
         * @param clearColor - The color as rgba, default to use the renderer backgroundColor
         * @param [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
         *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
         */
        clear(clearColor?: number[], mask?: BUFFER_BITS): void;
        resize(): void;
        /** Resets render-texture state. */
        reset(): void;
        destroy(): void;
    }

    /**
     * Base resource class for textures that manages validation and uploading, depending on its type.
     *
     * Uploading of a base texture to the GPU is required.
     *
     * @memberof PIXI
     */
    export abstract class Resource {
        /**
         * If resource has been destroyed.
         *
         * @readonly
         * @default false
         */
        destroyed: boolean;
        /**
         * `true` if resource is created by BaseTexture
         * useful for doing cleanup with BaseTexture destroy
         * and not cleaning up resources that were created
         * externally.
         */
        internal: boolean;
        /** Internal width of the resource. */
        protected _width: number;
        /** Internal height of the resource. */
        protected _height: number;
        /**
         * Mini-runner for handling resize events
         * accepts 2 parameters: width, height
         *
         * @member {Runner}
         * @private
         */
        protected onResize: Runner;
        /**
         * Mini-runner for handling update events
         *
         * @member {Runner}
         * @private
         */
        protected onUpdate: Runner;
        /**
         * Handle internal errors, such as loading errors
         * accepts 1 param: error
         *
         * @member {Runner}
         * @private
         */
        protected onError: Runner;
        /**
         * @param width - Width of the resource
         * @param height - Height of the resource
         */
        constructor(width?: number, height?: number);
        /**
         * Bind to a parent BaseTexture
         *
         * @param baseTexture - Parent texture
         */
        bind(baseTexture: BaseTexture): void;
        /**
         * Unbind to a parent BaseTexture
         *
         * @param baseTexture - Parent texture
         */
        unbind(baseTexture: BaseTexture): void;
        /**
         * Trigger a resize event
         *
         * @param width - X dimension
         * @param height - Y dimension
         */
        resize(width: number, height: number): void;
        /**
         * Has been validated
         *
         * @readonly
         */
        get valid(): boolean;
        /** Has been updated trigger event. */
        update(): void;
        /**
         * This can be overridden to start preloading a resource
         * or do any other prepare step.
         *
         * @protected
         * @return Handle the validate event
         */
        load(): Promise<Resource>;
        /**
         * The width of the resource.
         *
         * @readonly
         */
        get width(): number;
        /**
         * The height of the resource.
         *
         * @readonly
         */
        get height(): number;
        /**
         * Uploads the texture or returns false if it cant for some reason. Override this.
         *
         * @param renderer - yeah, renderer!
         * @param baseTexture - the texture
         * @param glTexture - texture instance for this webgl context
         * @returns - true is success
         */
        abstract upload(renderer: Renderer, baseTexture: BaseTexture, glTexture: GLTexture): boolean;
        /**
         * Set the style, optional to override
         *
         * @param renderer - yeah, renderer!
         * @param baseTexture - the texture
         * @param glTexture - texture instance for this webgl context
         * @returns - `true` is success
         */
        style(_renderer: Renderer, _baseTexture: BaseTexture, _glTexture: GLTexture): boolean;
        /** Clean up anything, this happens when destroying is ready. */
        dispose(): void;
        /**
         * Call when destroying resource, unbind any BaseTexture object
         * before calling this method, as reference counts are maintained
         * internally.
         */
        destroy(): void;
        /**
         * Abstract, used to auto-detect resource type.
         *
         * @param {*} source - The source object
         * @param {string} extension - The extension of source, if set
         */
        static test(_source: unknown, _extension?: string): boolean;
    }

    /**
     * @memberof PIXI
     * @namespace resources
     * @see PIXI
     * @deprecated since 6.0.0
     */
    export const resources: {};

    /**
     * System plugin to the renderer to manage scissor masking.
     *
     * Scissor masking discards pixels outside of a rectangle called the scissor box. The scissor box is in the framebuffer
     * viewport's space; however, the mask's rectangle is projected from world-space to viewport space automatically
     * by this system.
     *
     * @memberof PIXI
     */
    export class ScissorSystem extends AbstractMaskSystem {
        /**
         * @param {PIXI.Renderer} renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        getStackLength(): number;
        /**
         * evaluates _boundsTransformed, _scissorRect for MaskData
         * @param maskData
         */
        calcScissorRect(maskData: MaskData): void;
        private static isMatrixRotated;
        /**
         * Test, whether the object can be scissor mask with current renderer projection.
         * Calls "calcScissorRect()" if its true.
         * @param maskData mask data
         * @returns whether Whether the object can be scissor mask
         */
        testScissor(maskData: MaskData): boolean;
        private roundFrameToPixels;
        /**
         * Applies the Mask and adds it to the current stencil stack.
         *
         * @author alvin
         * @param maskData - The mask data.
         */
        push(maskData: MaskData): void;
        /**
         * This should be called after a mask is popped off the mask stack. It will rebind the scissor box to be latest with the
         * last mask in the stack.
         *
         * This can also be called when you directly modify the scissor box and want to restore PixiJS state.
         */
        pop(): void;
        /**
         * Setup renderer to use the current scissor data.
         * @private
         */
        _useCurrent(): void;
    }

    /**
     * A helper class for shaders.
     *
     * @memberof PIXI
     */
    export class Shader {
        /** Program that the shader uses. */
        program: Program;
        uniformGroup: UniformGroup;
        /**
         * Used internally to bind uniform buffer objects.
         * @ignore
         */
        uniformBindCount: number;
        /**
         * @param program - The program the shader will use.
         * @param uniforms - Custom uniforms to use to augment the built-in ones.
         */
        constructor(program: Program, uniforms?: any);
        checkUniformExists(name: string, group: UniformGroup): boolean;
        destroy(): void;
        /**
         * Shader uniform values, shortcut for `uniformGroup.uniforms`.
         *
         * @readonly
         */
        get uniforms(): any;
        /**
         * A short hand function to create a shader based of a vertex and fragment shader.
         *
         * @param vertexSrc - The source of the vertex shader.
         * @param fragmentSrc - The source of the fragment shader.
         * @param uniforms - Custom uniforms to use to augment the built-in ones.
         * @returns A shiny new PixiJS shader!
         */
        static from(vertexSrc?: string, fragmentSrc?: string, uniforms?: any): Shader;
    }

    /**
     * System plugin to the renderer to manage shaders.
     *
     * @memberof PIXI
     */
    export class ShaderSystem implements ISystem {
        /**
         * The current WebGL rendering context.
         *
         * @member {WebGLRenderingContext}
         */
        protected gl: IRenderingContext;
        shader: Shader;
        program: Program;
        id: number;
        destroyed: boolean;
        /** Cache to holds the generated functions. Stored against UniformObjects unique signature. */
        private cache;
        private _uboCache;
        private renderer;
        /** @param renderer - The renderer this System works for. */
        constructor(renderer: Renderer);
        /**
         * Overrideable function by `@pixi/unsafe-eval` to silence
         * throwing an error if platform doesn't support unsafe-evals.
         *
         * @private
         */
        systemCheck(): void;
        protected contextChange(gl: IRenderingContext): void;
        /**
         * Changes the current shader to the one given in parameter.
         *
         * @param shader - the new shader
         * @param dontSync - false if the shader should automatically sync its uniforms.
         * @returns the glProgram that belongs to the shader.
         */
        bind(shader: Shader, dontSync?: boolean): GLProgram;
        /**
         * Uploads the uniforms values to the currently bound shader.
         *
         * @param uniforms - the uniforms values that be applied to the current shader
         */
        setUniforms(uniforms: any): void;
        /**
         * Syncs uniforms on the group
         *
         * @param group - the uniform group to sync
         * @param syncData - this is data that is passed to the sync function and any nested sync functions
         */
        syncUniformGroup(group: UniformGroup, syncData?: any): void;
        /**
         * Overrideable by the @pixi/unsafe-eval package to use static syncUniforms instead.
         */
        syncUniforms(group: UniformGroup, glProgram: GLProgram, syncData: any): void;
        createSyncGroups(group: UniformGroup): UniformsSyncCallback_2;
        /**
         * Syncs uniform buffers
         *
         * @param group - the uniform buffer group to sync
         * @param name - the name of the uniform buffer
         */
        syncUniformBufferGroup(group: UniformGroup, name?: string): void;
        /**
         * Will create a function that uploads a uniform buffer using the STD140 standard.
         * The upload function will then be cached for future calls
         * If a group is manually managed, then a simple upload function is generated
         *
         * @param group - the uniform buffer group to sync
         * @param glProgram - the gl program to attach the uniform bindings to
         * @param name - the name of the uniform buffer (must exist on the shader)
         */
        protected createSyncBufferGroup(group: UniformGroup, glProgram: GLProgram, name: string): UniformsSyncCallback_2;
        /**
         * Takes a uniform group and data and generates a unique signature for them.
         *
         * @param group - The uniform group to get signature of
         * @param uniformData - Uniform information generated by the shader
         * @returns Unique signature of the uniform group
         */
        private getSignature;
        /**
         * Returns the underlying GLShade rof the currently bound shader.
         *
         * This can be handy for when you to have a little more control over the setting of your uniforms.
         *
         * @return The glProgram for the currently bound Shader for this context
         */
        getGlProgram(): GLProgram;
        /**
         * Generates a glProgram version of the Shader provided.
         *
         * @param shader - The shader that the glProgram will be based on.
         * @return A shiny new glProgram!
         */
        generateProgram(shader: Shader): GLProgram;
        /** Resets ShaderSystem state, does not affect WebGL state. */
        reset(): void;
        /** Destroys this System and removes all its textures. */
        destroy(): void;
    }

    /**
     * This handles a Sprite acting as a mask, as opposed to a Graphic.
     *
     * WebGL only.
     *
     * @memberof PIXI
     */
    export class SpriteMaskFilter extends Filter {
        /** @private */
        _maskSprite: IMaskTarget;
        /** Mask matrix */
        maskMatrix: Matrix;
        /**
         * @param {PIXI.Sprite} sprite - The target sprite.
         */
        constructor(sprite: IMaskTarget);
        /**
         * @param vertexSrc - The source of the vertex shader.
         * @param fragmentSrc - The source of the fragment shader.
         * @param uniforms - Custom uniforms to use to augment the built-in ones.
         */
        constructor(vertexSrc?: string, fragmentSrc?: string, uniforms?: any);
        /**
         * Sprite mask
         *
         * @type {PIXI.DisplayObject}
         */
        get maskSprite(): IMaskTarget;
        set maskSprite(value: IMaskTarget);
        /**
         * Applies the filter
         *
         * @param filterManager - The renderer to retrieve the filter from
         * @param input - The input render target.
         * @param output - The target to output to.
         * @param clearMode - Should the output be cleared before rendering to it.
         */
        apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode: CLEAR_MODES): void;
    }

    /**
     * This is a WebGL state, and is is passed to {@link PIXI.StateSystem}.
     *
     * Each mesh rendered may require WebGL to be in a different state.
     * For example you may want different blend mode or to enable polygon offsets
     *
     * @memberof PIXI
     */
    export class State {
        data: number;
        _blendMode: BLEND_MODES;
        _polygonOffset: number;
        constructor();
        /**
         * Activates blending of the computed fragment color values.
         *
         * @default true
         */
        get blend(): boolean;
        set blend(value: boolean);
        /**
         * Activates adding an offset to depth values of polygon's fragments
         *
         * @default false
         */
        get offsets(): boolean;
        set offsets(value: boolean);
        /**
         * Activates culling of polygons.
         *
         * @default false
         */
        get culling(): boolean;
        set culling(value: boolean);
        /**
         * Activates depth comparisons and updates to the depth buffer.
         *
         * @default false
         */
        get depthTest(): boolean;
        set depthTest(value: boolean);
        /**
         * Enables or disables writing to the depth buffer.
         *
         * @default true
         */
        get depthMask(): boolean;
        set depthMask(value: boolean);
        /**
         * Specifies whether or not front or back-facing polygons can be culled.
         *
         * @default false
         */
        get clockwiseFrontFace(): boolean;
        set clockwiseFrontFace(value: boolean);
        /**
         * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
         * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
         *
         * @default PIXI.BLEND_MODES.NORMAL
         */
        get blendMode(): BLEND_MODES;
        set blendMode(value: BLEND_MODES);
        /**
         * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
         *
         * @default 0
         */
        get polygonOffset(): number;
        set polygonOffset(value: number);
        toString(): string;
        static for2d(): State;
    }

    /**
     * System plugin to the renderer to manage WebGL state machines.
     *
     * @memberof PIXI
     */
    export class StateSystem implements ISystem {
        /**
         * State ID
         * @readonly
         */
        stateId: number;
        /**
         * Polygon offset
         * @readonly
         */
        polygonOffset: number;
        /**
         * Blend mode
         * @default PIXI.BLEND_MODES.NONE
         * @readonly
         */
        blendMode: BLEND_MODES;
        /** Whether current blend equation is different */
        protected _blendEq: boolean;
        /**
         * GL context
         * @member {WebGLRenderingContext}
         * @readonly
         */
        protected gl: IRenderingContext;
        protected blendModes: number[][];
        /**
         * Collection of calls
         * @member {function[]}
         */
        protected readonly map: Array<(value: boolean) => void>;
        /**
         * Collection of check calls
         * @member {function[]}
         */
        protected readonly checks: Array<(system: this, state: State) => void>;
        /**
         * Default WebGL State
         * @readonly
         */
        protected defaultState: State;
        constructor();
        contextChange(gl: IRenderingContext): void;
        /**
         * Sets the current state
         *
         * @param {*} state - The state to set.
         */
        set(state: State): void;
        /**
         * Sets the state, when previous state is unknown.
         *
         * @param {*} state - The state to set
         */
        forceState(state: State): void;
        /**
         * Sets whether to enable or disable blending.
         *
         * @param value - Turn on or off WebGl blending.
         */
        setBlend(value: boolean): void;
        /**
         * Sets whether to enable or disable polygon offset fill.
         *
         * @param value - Turn on or off webgl polygon offset testing.
         */
        setOffset(value: boolean): void;
        /**
         * Sets whether to enable or disable depth test.
         *
         * @param value - Turn on or off webgl depth testing.
         */
        setDepthTest(value: boolean): void;
        /**
         * Sets whether to enable or disable depth mask.
         *
         * @param value - Turn on or off webgl depth mask.
         */
        setDepthMask(value: boolean): void;
        /**
         * Sets whether to enable or disable cull face.
         *
         * @param {boolean} value - Turn on or off webgl cull face.
         */
        setCullFace(value: boolean): void;
        /**
         * Sets the gl front face.
         *
         * @param {boolean} value - true is clockwise and false is counter-clockwise
         */
        setFrontFace(value: boolean): void;
        /**
         * Sets the blend mode.
         *
         * @param {number} value - The blend mode to set to.
         */
        setBlendMode(value: number): void;
        /**
         * Sets the polygon offset.
         *
         * @param {number} value - the polygon offset
         * @param {number} scale - the polygon offset scale
         */
        setPolygonOffset(value: number, scale: number): void;
        /** Resets all the logic and disables the VAOs. */
        reset(): void;
        /**
         * Checks to see which updates should be checked based on which settings have been activated.
         *
         * For example, if blend is enabled then we should check the blend modes each time the state is changed
         * or if polygon fill is activated then we need to check if the polygon offset changes.
         * The idea is that we only check what we have too.
         *
         * @param func - the checking function to add or remove
         * @param value - should the check function be added or removed.
         */
        updateCheck(func: (system: this, state: State) => void, value: boolean): void;
        /**
         * A private little wrapper function that we call to check the blend mode.
         *
         * @param System - the System to perform the state check on
         * @param state - the state that the blendMode will pulled from
         */
        private static checkBlendMode;
        /**
         * A private little wrapper function that we call to check the polygon offset.
         *
         * @param System - the System to perform the state check on
         * @param state - the state that the blendMode will pulled from
         */
        private static checkPolygonOffset;
        /**
         * @ignore
         */
        destroy(): void;
    }

    /**
     * System plugin to the renderer to manage stencils (used for masks).
     *
     * @memberof PIXI
     */
    export class StencilSystem extends AbstractMaskSystem {
        /**
         * @param renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        getStackLength(): number;
        /**
         * Applies the Mask and adds it to the current stencil stack.
         *
         * @param maskData - The mask data
         */
        push(maskData: MaskData): void;
        /**
         * Pops stencil mask. MaskData is already removed from stack
         *
         * @param {PIXI.DisplayObject} maskObject - object of popped mask data
         */
        pop(maskObject: IMaskTarget): void;
        /**
         * Setup renderer to use the current stencil data.
         * @private
         */
        _useCurrent(): void;
    }

    /**
     * Resource type for SVG elements and graphics.
     *
     * @memberof PIXI
     */
    export class SVGResource extends BaseImageResource {
        /** Base64 encoded SVG element or URL for SVG file. */
        readonly svg: string;
        /** The source scale to apply when rasterizing on load. */
        readonly scale: number;
        /** A width override for rasterization on load. */
        readonly _overrideWidth: number;
        /** A height override for rasterization on load. */
        readonly _overrideHeight: number;
        /** Call when completely loaded. */
        private _resolve;
        /** Promise when loading */
        private _load;
        /** Cross origin value to use */
        private _crossorigin?;
        /**
         * @param sourceBase64 - Base64 encoded SVG element or URL for SVG file.
         * @param {object} [options] - Options to use
         * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
         * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
         * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
         * @param {boolean} [options.autoLoad=true] - Start loading right away.
         */
        constructor(sourceBase64: string, options?: ISVGResourceOptions);
        load(): Promise<SVGResource>;
        /** Loads an SVG image from `imageUrl` or `data URL`. */
        private _loadSvg;
        /**
         * Get size from an svg string using a regular expression.
         *
         * @param svgString - a serialized svg element
         * @return - image extension
         */
        static getSize(svgString?: string): ISize;
        /** Destroys this texture. */
        dispose(): void;
        /**
         * Used to auto-detect the type of resource.
         *
         * @param {*} source - The source object
         * @param {string} extension - The extension of source, if set
         * @return {boolean} - If the source is a SVG source or data file
         */
        static test(source: unknown, extension?: string): boolean;
        /**
         * Regular expression for SVG XML document.
         *
         * @example &lt;?xml version="1.0" encoding="utf-8" ?&gt;&lt;!-- image/svg --&gt;&lt;svg
         * @readonly
         */
        static SVG_XML: RegExp;
        /**
         * Regular expression for SVG size.
         *
         * @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
         * @readonly
         */
        static SVG_SIZE: RegExp;
    }

    /**
     * Use the ISystem interface instead.
     * @deprecated since 6.1.0
     * @memberof PIXI
     */
    export class System implements ISystem {
        /** Reference to the main renderer */
        renderer: Renderer;
        /**
         * @param renderer - Reference to Renderer
         */
        constructor(renderer: Renderer);
        /** Destroy and don't use after this. */
        destroy(): void;
    }

    /**
     * @memberof PIXI
     * @namespace systems
     * @see PIXI
     * @deprecated since 6.0.0
     */
    export const systems: {};

    export interface Texture extends GlobalMixins.Texture, PIXI.utils.EventEmitter {
    }

    /**
     * A texture stores the information that represents an image or part of an image.
     *
     * It cannot be added to the display list directly; instead use it as the texture for a Sprite.
     * If no frame is provided for a texture, then the whole image is used.
     *
     * You can directly create a texture from an image and then reuse it multiple times like this :
     *
     * ```js
     * let texture = PIXI.Texture.from('assets/image.png');
     * let sprite1 = new PIXI.Sprite(texture);
     * let sprite2 = new PIXI.Sprite(texture);
     * ```
     *
     * If you didnt pass the texture frame to constructor, it enables `noFrame` mode:
     * it subscribes on baseTexture events, it automatically resizes at the same time as baseTexture.
     *
     * Textures made from SVGs, loaded or not, cannot be used before the file finishes processing.
     * You can check for this by checking the sprite's _textureID property.
     * ```js
     * var texture = PIXI.Texture.from('assets/image.svg');
     * var sprite1 = new PIXI.Sprite(texture);
     * //sprite1._textureID should not be undefined if the texture has finished processing the SVG file
     * ```
     * You can use a ticker or rAF to ensure your sprites load the finished textures after processing. See issue #3068.
     *
     * @class
     * @extends PIXI.utils.EventEmitter
     * @memberof PIXI
     * @typeParam R - The BaseTexture's Resource type.
     */
    export class Texture<R extends Resource = Resource> extends PIXI.utils.EventEmitter {
        baseTexture: BaseTexture<R>;
        orig: Rectangle;
        trim: Rectangle;
        valid: boolean;
        noFrame: boolean;
        defaultAnchor: Point;
        uvMatrix: TextureMatrix;
        protected _rotate: number;
        _updateID: number;
        _frame: Rectangle;
        _uvs: TextureUvs;
        textureCacheIds: Array<string>;
        /**
         * @param {PIXI.BaseTexture} baseTexture - The base texture source to create the texture from
         * @param {PIXI.Rectangle} [frame] - The rectangle frame of the texture to show
         * @param {PIXI.Rectangle} [orig] - The area of original texture
         * @param {PIXI.Rectangle} [trim] - Trimmed rectangle of original texture
         * @param {number} [rotate] - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
         * @param {PIXI.IPointData} [anchor] - Default anchor point used for sprite placement / rotation
         */
        constructor(baseTexture: BaseTexture<R>, frame?: Rectangle, orig?: Rectangle, trim?: Rectangle, rotate?: number, anchor?: IPointData);
        /**
         * Updates this texture on the gpu.
         *
         * Calls the TextureResource update.
         *
         * If you adjusted `frame` manually, please call `updateUvs()` instead.
         *
         */
        update(): void;
        /**
         * Called when the base texture is updated
         *
         * @protected
         * @param {PIXI.BaseTexture} baseTexture - The base texture.
         */
        onBaseTextureUpdated(baseTexture: BaseTexture): void;
        /**
         * Destroys this texture
         *
         * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
         */
        destroy(destroyBase?: boolean): void;
        /**
         * Creates a new texture object that acts the same as this one.
         *
         * @return {PIXI.Texture} The new texture
         */
        clone(): Texture;
        /**
         * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
         * Call it after changing the frame
         */
        updateUvs(): void;
        /**
         * Helper function that creates a new Texture based on the source you provide.
         * The source can be - frame id, image url, video url, canvas element, video element, base texture
         *
         * @static
         * @param {string|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|PIXI.BaseTexture} source -
         *        Source to create texture from
         * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
         * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
         * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
         * @return {PIXI.Texture} The newly created texture
         */
        static from<R extends Resource = Resource, RO = any>(source: TextureSource, options?: IBaseTextureOptions<RO>, strict?: boolean): Texture<R>;
        /**
         * Useful for loading textures via URLs. Use instead of `Texture.from` because
         * it does a better job of handling failed URLs more effectively. This also ignores
         * `PIXI.settings.STRICT_TEXTURE_CACHE`. Works for Videos, SVGs, Images.
         * @param {string} url - The remote URL to load.
         * @param {object} [options] - Optional options to include
         * @return {Promise<PIXI.Texture>} A Promise that resolves to a Texture.
         */
        static fromURL<R extends Resource = Resource, RO = any>(url: string, options?: IBaseTextureOptions<RO>): Promise<Texture<R>>;
        /**
         * Create a new Texture with a BufferResource from a Float32Array.
         * RGBA values are floats from 0 to 1.
         * @static
         * @param {Float32Array|Uint8Array} buffer - The optional array to use, if no data
         *        is provided, a new Float32Array is created.
         * @param {number} width - Width of the resource
         * @param {number} height - Height of the resource
         * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
         * @return {PIXI.Texture} The resulting new BaseTexture
         */
        static fromBuffer(buffer: Float32Array | Uint8Array, width: number, height: number, options?: IBaseTextureOptions<ISize>): Texture<BufferResource>;
        /**
         * Create a texture from a source and add to the cache.
         *
         * @static
         * @param {HTMLImageElement|HTMLCanvasElement|string} source - The input source.
         * @param {String} imageUrl - File name of texture, for cache and resolving resolution.
         * @param {String} [name] - Human readable name for the texture cache. If no name is
         *        specified, only `imageUrl` will be used as the cache ID.
         * @return {PIXI.Texture} Output texture
         */
        static fromLoader<R extends Resource = Resource>(source: HTMLImageElement | HTMLCanvasElement | string, imageUrl: string, name?: string, options?: IBaseTextureOptions): Promise<Texture<R>>;
        /**
         * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
         *
         * @static
         * @param {PIXI.Texture} texture - The Texture to add to the cache.
         * @param {string} id - The id that the Texture will be stored against.
         */
        static addToCache(texture: Texture, id: string): void;
        /**
         * Remove a Texture from the global TextureCache.
         *
         * @static
         * @param {string|PIXI.Texture} texture - id of a Texture to be removed, or a Texture instance itself
         * @return {PIXI.Texture|null} The Texture that was removed
         */
        static removeFromCache(texture: string | Texture): Texture | null;
        /**
         * Returns resolution of baseTexture
         *
         * @member {number}
         * @readonly
         */
        get resolution(): number;
        /**
         * The frame specifies the region of the base texture that this texture uses.
         * Please call `updateUvs()` after you change coordinates of `frame` manually.
         *
         * @member {PIXI.Rectangle}
         */
        get frame(): Rectangle;
        set frame(frame: Rectangle);
        /**
         * Indicates whether the texture is rotated inside the atlas
         * set to 2 to compensate for texture packer rotation
         * set to 6 to compensate for spine packer rotation
         * can be used to rotate or mirror sprites
         * See {@link PIXI.groupD8} for explanation
         *
         * @member {number}
         */
        get rotate(): number;
        set rotate(rotate: number);
        /**
         * The width of the Texture in pixels.
         *
         * @member {number}
         */
        get width(): number;
        /**
         * The height of the Texture in pixels.
         *
         * @member {number}
         */
        get height(): number;
        /**
         * Utility function for BaseTexture|Texture cast
         */
        castToBaseTexture(): BaseTexture;
        static readonly EMPTY: Texture<CanvasResource>;
        static readonly WHITE: Texture<CanvasResource>;
    }

    /**
     * System plugin to the renderer to manage texture garbage collection on the GPU,
     * ensuring that it does not get clogged up with textures that are no longer being used.
     *
     * @class
     * @memberof PIXI
     * @extends PIXI.System
     */
    export class TextureGCSystem implements ISystem {
        count: number;
        checkCount: number;
        maxIdle: number;
        checkCountMax: number;
        mode: GC_MODES;
        private renderer;
        /**
         * @param {PIXI.Renderer} renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * Checks to see when the last time a texture was used
         * if the texture has not been used for a specified amount of time it will be removed from the GPU
         */
        protected postrender(): void;
        /**
         * Checks to see when the last time a texture was used
         * if the texture has not been used for a specified amount of time it will be removed from the GPU
         */
        run(): void;
        /**
         * Removes all the textures within the specified displayObject and its children from the GPU
         *
         * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
         */
        unload(displayObject: IUnloadableTexture): void;
        /**
         * @ignore
         */
        destroy(): void;
    }

    /**
     * Class controls uv mapping from Texture normal space to BaseTexture normal space.
     *
     * Takes `trim` and `rotate` into account. May contain clamp settings for Meshes and TilingSprite.
     *
     * Can be used in Texture `uvMatrix` field, or separately, you can use different clamp settings on the same texture.
     * If you want to add support for texture region of certain feature or filter, that's what you're looking for.
     *
     * Takes track of Texture changes through `_lastTextureID` private field.
     * Use `update()` method call to track it from outside.
     *
     * @see PIXI.Texture
     * @see PIXI.Mesh
     * @see PIXI.TilingSprite
     * @class
     * @memberof PIXI
     */
    export class TextureMatrix {
        mapCoord: Matrix;
        clampOffset: number;
        clampMargin: number;
        readonly uClampFrame: Float32Array;
        readonly uClampOffset: Float32Array;
        _textureID: number;
        _updateID: number;
        _texture: Texture;
        isSimple: boolean;
        /**
         *
         * @param {PIXI.Texture} texture - observed texture
         * @param {number} [clampMargin] - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
         * @constructor
         */
        constructor(texture: Texture, clampMargin?: number);
        /**
         * texture property
         * @member {PIXI.Texture}
         */
        get texture(): Texture;
        set texture(value: Texture);
        /**
         * Multiplies uvs array to transform
         * @param {Float32Array} uvs - mesh uvs
         * @param {Float32Array} [out=uvs] - output
         * @returns {Float32Array} output
         */
        multiplyUvs(uvs: Float32Array, out?: Float32Array): Float32Array;
        /**
         * updates matrices if texture was changed
         * @param {boolean} [forceUpdate=false] - if true, matrices will be updated any case
         * @returns {boolean} whether or not it was updated
         */
        update(forceUpdate?: boolean): boolean;
    }

    export type TextureSource = string | BaseTexture | ImageSource;

    /**
     * System plugin to the renderer to manage textures.
     *
     * @class
     * @extends PIXI.System
     * @memberof PIXI
     */
    export class TextureSystem implements ISystem {
        boundTextures: BaseTexture[];
        managedTextures: Array<BaseTexture>;
        /** Whether glTexture with int/uint sampler type was uploaded. */
        protected hasIntegerTextures: boolean;
        protected CONTEXT_UID: number;
        protected gl: IRenderingContext;
        protected internalFormats: {
            [type: number]: {
                [format: number]: number;
            };
        };
        protected webGLVersion: number;
        protected unknownTexture: BaseTexture;
        protected _unknownBoundTextures: boolean;
        currentLocation: number;
        emptyTextures: {
            [key: number]: GLTexture;
        };
        private renderer;
        /**
         * @param {PIXI.Renderer} renderer - The renderer this System works for.
         */
        constructor(renderer: Renderer);
        /**
         * Sets up the renderer context and necessary buffers.
         */
        contextChange(): void;
        /**
         * Bind a texture to a specific location
         *
         * If you want to unbind something, please use `unbind(texture)` instead of `bind(null, textureLocation)`
         *
         * @param {PIXI.Texture|PIXI.BaseTexture} texture_ - Texture to bind
         * @param {number} [location=0] - Location to bind at
         */
        bind(texture: Texture | BaseTexture, location?: number): void;
        /**
         * Resets texture location and bound textures
         *
         * Actual `bind(null, i)` calls will be performed at next `unbind()` call
         */
        reset(): void;
        /**
         * Unbind a texture
         * @param {PIXI.BaseTexture} texture - Texture to bind
         */
        unbind(texture?: BaseTexture): void;
        /**
         * Ensures that current boundTextures all have FLOAT sampler type,
         * see {@link PIXI.SAMPLER_TYPES} for explanation.
         *
         * @param maxTextures - number of locations to check
         */
        ensureSamplerType(maxTextures: number): void;
        /**
         * Initialize a texture
         *
         * @private
         * @param {PIXI.BaseTexture} texture - Texture to initialize
         */
        initTexture(texture: BaseTexture): GLTexture;
        initTextureType(texture: BaseTexture, glTexture: GLTexture): void;
        /**
         * Update a texture
         *
         * @private
         * @param {PIXI.BaseTexture} texture - Texture to initialize
         */
        updateTexture(texture: BaseTexture): void;
        /**
         * Deletes the texture from WebGL
         *
         * @private
         * @param {PIXI.BaseTexture|PIXI.Texture} texture_ - the texture to destroy
         * @param {boolean} [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
         */
        destroyTexture(texture: BaseTexture | Texture, skipRemove?: boolean): void;
        /**
         * Update texture style such as mipmap flag
         *
         * @private
         * @param {PIXI.BaseTexture} texture - Texture to update
         */
        updateTextureStyle(texture: BaseTexture): void;
        /**
         * Set style for texture
         *
         * @private
         * @param {PIXI.BaseTexture} texture - Texture to update
         * @param {PIXI.GLTexture} glTexture
         */
        setStyle(texture: BaseTexture, glTexture: GLTexture): void;
        /**
         * @ignore
         */
        destroy(): void;
    }

    /**
     * Stores a texture's frame in UV coordinates, in
     * which everything lies in the rectangle `[(0,0), (1,0),
     * (1,1), (0,1)]`.
     *
     * | Corner       | Coordinates |
     * |--------------|-------------|
     * | Top-Left     | `(x0,y0)`   |
     * | Top-Right    | `(x1,y1)`   |
     * | Bottom-Right | `(x2,y2)`   |
     * | Bottom-Left  | `(x3,y3)`   |
     *
     * @class
     * @protected
     * @memberof PIXI
     */
    export class TextureUvs {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
        y3: number;
        uvsFloat32: Float32Array;
        constructor();
        /**
         * Sets the texture Uvs based on the given frame information.
         *
         * @protected
         * @param {PIXI.Rectangle} frame - The frame of the texture
         * @param {PIXI.Rectangle} baseFrame - The base frame of the texture
         * @param {number} rotate - Rotation of frame, see {@link PIXI.groupD8}
         */
        set(frame: Rectangle, baseFrame: ISize, rotate: number): void;
        toString(): string;
    }

    interface UBOElement {
        data: IUniformData;
        offset: number;
        dataLen: number;
        dirty: number;
    }

    /**
     * Uniform group holds uniform map and some ID's for work
     *
     * `UniformGroup` has two modes:
     *
     * 1: Normal mode
     * Normal mode will upload the uniforms with individual function calls as required
     *
     * 2: Uniform buffer mode
     * This mode will treat the uniforms as a uniform buffer. You can pass in either a buffer that you manually handle, or
     * or a generic object that PixiJS will automatically map to a buffer for you.
     * For maximum benefits, make Ubo UniformGroups static, and only update them each frame.
     *
     * Rules of UBOs:
     * - UBOs only work with WebGL2, so make sure you have a fallback!
     * - Only floats are supported (including vec[2,3,4], mat[2,3,4])
     * - Samplers cannot be used in ubo's (a GPU limitation)
     * - You must ensure that the object you pass in exactly matches in the shader ubo structure.
     * Otherwise, weirdness will ensue!
     * - The name of the ubo object added to the group must match exactly the name of the ubo in the shader.
     *
     * ```
     * // ubo in shader:
     * uniform myCoolData { // declaring a ubo..
     * mat4 uCoolMatrix;
     * float uFloatyMcFloatFace
     *
     *
     * // a new uniform buffer object..
     * const myCoolData = new UniformBufferGroup({
     *   uCoolMatrix: new Matrix(),
     *   uFloatyMcFloatFace: 23,
     * }}
     *
     * // build a shader...
     * const shader = Shader.from(srcVert, srcFrag, {
     *   myCoolData // name matches the ubo name in the shader. will be processed accordingly.
     * })
     *
     *  ```
     *
     * @class
     * @memberof PIXI
     */
    export class UniformGroup<LAYOUT = any> {
        readonly uniforms: LAYOUT;
        readonly group: boolean;
        id: number;
        syncUniforms: any;
        dirtyId: number;
        static: boolean;
        ubo: boolean;
        buffer?: Buffer_2;
        autoManage: boolean;
        /**
         * @param {object | Buffer} [uniforms] - Custom uniforms to use to augment the built-in ones. Or a pixi buffer
         * @param {boolean} [isStatic] - Uniforms wont be changed after creation
         * @param {boolean} [isUbo] - if true, will treat this uniform group as a uniform buffer object
         */
        constructor(uniforms: LAYOUT | Buffer_2, isStatic?: boolean, isUbo?: boolean);
        update(): void;
        add(name: string, uniforms: any, _static?: boolean): void;
        static from(uniforms: any | Buffer_2, _static?: boolean, _ubo?: boolean): UniformGroup;
        /**
         * A short hand function for creating a static UBO UniformGroup.
         *
         * @param uniforms - the ubo item
         * @param _static - should this be updated each time it is used? defaults to true here!
         */
        static uboFrom(uniforms: any | Buffer_2, _static?: boolean): UniformGroup;
    }

    export const uniformParsers: IUniformParser[];

    export type UniformsSyncCallback = (...args: any[]) => void;

    type UniformsSyncCallback_2 = (...args: any[]) => void;

    /**
     * Resource type for {@code HTMLVideoElement}.
     *
     * @memberof PIXI
     */
    export class VideoResource extends BaseImageResource {
        /** Override the source to be the video element. */
        source: HTMLVideoElement;
        /**
         * `true` to use PIXI.Ticker.shared to auto update the base texture.
         *
         * @default true
         */
        protected _autoUpdate: boolean;
        /**
         * `true` if the instance is currently connected to PIXI.Ticker.shared to auto update the base texture.
         *
         * @default false
         */
        protected _isConnectedToTicker: boolean;
        protected _updateFPS: number;
        protected _msToNextUpdate: number;
        /**
         * When set to true will automatically play videos used by this texture once
         * they are loaded. If false, it will not modify the playing state.
         *
         * @default true
         */
        protected autoPlay: boolean;
        /**
         * Promise when loading.
         *
         * @default null
         */
        private _load;
        /** Callback when completed with load. */
        private _resolve;
        /**
         * @param {HTMLVideoElement|object|string|Array<string|object>} source - Video element to use.
         * @param {object} [options] - Options to use
         * @param {boolean} [options.autoLoad=true] - Start loading the video immediately
         * @param {boolean} [options.autoPlay=true] - Start playing video immediately
         * @param {number} [options.updateFPS=0] - How many times a second to update the texture from the video.
         * Leave at 0 to update at every render.
         * @param {boolean} [options.crossorigin=true] - Load image using cross origin
         */
        constructor(source?: HTMLVideoElement | Array<string | IVideoResourceOptionsElement> | string, options?: IVideoResourceOptions);
        /**
         * Trigger updating of the texture.
         *
         * @param deltaTime - time delta since last tick
         */
        update(_deltaTime?: number): void;
        /**
         * Start preloading the video resource.
         *
         * @return {Promise<void>} Handle the validate event
         */
        load(): Promise<VideoResource>;
        /** Handle video error events. */
        private _onError;
        /**
         * Returns true if the underlying source is playing.
         *
         * @return - True if playing.
         */
        private _isSourcePlaying;
        /**
         * Returns true if the underlying source is ready for playing.
         *
         * @return - True if ready.
         */
        private _isSourceReady;
        /** Runs the update loop when the video is ready to play. */
        private _onPlayStart;
        /** Fired when a pause event is triggered, stops the update loop. */
        private _onPlayStop;
        /** Fired when the video is loaded and ready to play. */
        private _onCanPlay;
        /** Destroys this texture. */
        dispose(): void;
        /** Should the base texture automatically update itself, set to true by default. */
        get autoUpdate(): boolean;
        set autoUpdate(value: boolean);
        /**
         * How many times a second to update the texture from the video. Leave at 0 to update at every render.
         * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
         */
        get updateFPS(): number;
        set updateFPS(value: number);
        /**
         * Used to auto-detect the type of resource.
         *
         * @param {*} source - The source object
         * @param {string} extension - The extension of source, if set
         * @return {boolean} `true` if video source
         */
        static test(source: unknown, extension?: string): source is HTMLVideoElement;
        /**
         * List of common video file extensions supported by VideoResource.
         *
         * @readonly
         */
        static TYPES: Array<string>;
        /**
         * Map of video MIME types that can't be directly derived from file extensions.
         *
         * @readonly
         */
        static MIME_TYPES: any;
    }

    /**
     * Flexible wrapper around `ArrayBuffer` that also provides typed array views on demand.
     *
     * @class
     * @memberof PIXI
     */
    export class ViewableBuffer {
        size: number;
        rawBinaryData: ArrayBuffer;
        uint32View: Uint32Array;
        float32View: Float32Array;
        private _int8View;
        private _uint8View;
        private _int16View;
        private _uint16View;
        private _int32View;
        /**
         * @param {number} length - The size of the buffer in bytes.
         */
        constructor(length: number);
        /**
         * @param {ArrayBuffer} arrayBuffer - The source array buffer.
         */
        constructor(arrayBuffer: ArrayBuffer);
        /**
         * View on the raw binary data as a `Int8Array`.
         *
         * @member {Int8Array}
         */
        get int8View(): Int8Array;
        /**
         * View on the raw binary data as a `Uint8Array`.
         *
         * @member {Uint8Array}
         */
        get uint8View(): Uint8Array;
        /**
         * View on the raw binary data as a `Int16Array`.
         *
         * @member {Int16Array}
         */
        get int16View(): Int16Array;
        /**
         * View on the raw binary data as a `Uint16Array`.
         *
         * @member {Uint16Array}
         */
        get uint16View(): Uint16Array;
        /**
         * View on the raw binary data as a `Int32Array`.
         *
         * @member {Int32Array}
         */
        get int32View(): Int32Array;
        /**
         * Returns the view of the given type.
         *
         * @param {string} type - One of `int8`, `uint8`, `int16`,
         *    `uint16`, `int32`, `uint32`, and `float32`.
         * @return {object} typed array of given type
         */
        view(type: string): ITypedArray;
        /**
         * Destroys all buffer references. Do not use after calling
         * this.
         */
        destroy(): void;
        static sizeOf(type: string): number;
    }

    interface WEBGL_compressed_texture_atc {
        COMPRESSED_RGB_ATC_WEBGL: number;
        COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: number;
        COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: number;
    }

    interface WEBGL_compressed_texture_etc {
        COMPRESSED_R11_EAC: number;
        COMPRESSED_SIGNED_R11_EAC: number;
        COMPRESSED_RG11_EAC: number;
        COMPRESSED_SIGNED_RG11_EAC: number;
        COMPRESSED_RGB8_ETC2: number;
        COMPRESSED_RGBA8_ETC2_EAC: number;
        COMPRESSED_SRGB8_ETC2: number;
        COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: number;
        COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: number;
        COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: number;
    }

    interface WEBGL_compressed_texture_etc1 {
        COMPRESSED_RGB_ETC1_WEBGL: number;
    }

    interface WEBGL_compressed_texture_pvrtc {
        COMPRESSED_RGB_PVRTC_4BPPV1_IMG: number;
        COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: number;
        COMPRESSED_RGB_PVRTC_2BPPV1_IMG: number;
        COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: number;
    }

    interface WebGLExtensions {
        drawBuffers?: WEBGL_draw_buffers;
        depthTexture?: OES_texture_float;
        loseContext?: WEBGL_lose_context;
        vertexArrayObject?: OES_vertex_array_object;
        anisotropicFiltering?: EXT_texture_filter_anisotropic;
        uint32ElementIndex?: OES_element_index_uint;
        floatTexture?: OES_texture_float;
        floatTextureLinear?: OES_texture_float_linear;
        textureHalfFloat?: OES_texture_half_float;
        textureHalfFloatLinear?: OES_texture_half_float_linear;
        colorBufferFloat?: WEBGL_color_buffer_float;
        s3tc?: WEBGL_compressed_texture_s3tc;
        s3tc_sRGB?: WEBGL_compressed_texture_s3tc_srgb;
        etc?: WEBGL_compressed_texture_etc;
        etc1?: WEBGL_compressed_texture_etc1;
        pvrtc?: WEBGL_compressed_texture_pvrtc;
        atc?: WEBGL_compressed_texture_atc;
        astc?: WEBGL_compressed_texture_astc;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface BaseTexture {

        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Texture {

        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface BaseRenderTexture {

        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface IRendererOptions {

        }
    }
    /////////////////////////////////////////////////
    ////////////////display//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * 'Builder' pattern for bounds rectangles.
     *
     * This could be called an Axis-Aligned Bounding Box.
     * It is not an actual shape. It is a mutable thing; no 'EMPTY' or those kind of problems.
     *
     * @class
     * @memberof PIXI
     */
    export class Bounds {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        rect: Rectangle;
        updateID: number;
        constructor();
        /**
         * Checks if bounds are empty.
         *
         * @return {boolean} True if empty.
         */
        isEmpty(): boolean;
        /**
         * Clears the bounds and resets.
         *
         */
        clear(): void;
        /**
         * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
         * It is not guaranteed that it will return tempRect
         *
         * @param {PIXI.Rectangle} rect - temporary object will be used if AABB is not empty
         * @returns {PIXI.Rectangle} A rectangle of the bounds
         */
        getRectangle(rect?: Rectangle): Rectangle;
        /**
         * This function should be inlined when its possible.
         *
         * @param {PIXI.IPointData} point - The point to add.
         */
        addPoint(point: IPointData): void;
        /**
         * Adds a point, after transformed. This should be inlined when its possible.
         *
         * @param matrix
         * @param point
         */
        addPointMatrix(matrix: Matrix, point: IPointData): void;
        /**
         * Adds a quad, not transformed
         *
         * @param {Float32Array} vertices - The verts to add.
         */
        addQuad(vertices: Float32Array): void;
        /**
         * Adds sprite frame, transformed.
         *
         * @param {PIXI.Transform} transform - transform to apply
         * @param {number} x0 - left X of frame
         * @param {number} y0 - top Y of frame
         * @param {number} x1 - right X of frame
         * @param {number} y1 - bottom Y of frame
         */
        addFrame(transform: Transform, x0: number, y0: number, x1: number, y1: number): void;
        /**
         * Adds sprite frame, multiplied by matrix
         *
         * @param {PIXI.Matrix} matrix - matrix to apply
         * @param {number} x0 - left X of frame
         * @param {number} y0 - top Y of frame
         * @param {number} x1 - right X of frame
         * @param {number} y1 - bottom Y of frame
         */
        addFrameMatrix(matrix: Matrix, x0: number, y0: number, x1: number, y1: number): void;
        /**
         * Adds screen vertices from array
         *
         * @param {Float32Array} vertexData - calculated vertices
         * @param {number} beginOffset - begin offset
         * @param {number} endOffset - end offset, excluded
         */
        addVertexData(vertexData: Float32Array, beginOffset: number, endOffset: number): void;
        /**
         * Add an array of mesh vertices
         *
         * @param {PIXI.Transform} transform - mesh transform
         * @param {Float32Array} vertices - mesh coordinates in array
         * @param {number} beginOffset - begin offset
         * @param {number} endOffset - end offset, excluded
         */
        addVertices(transform: Transform, vertices: Float32Array, beginOffset: number, endOffset: number): void;
        /**
         * Add an array of mesh vertices.
         *
         * @param {PIXI.Matrix} matrix - mesh matrix
         * @param {Float32Array} vertices - mesh coordinates in array
         * @param {number} beginOffset - begin offset
         * @param {number} endOffset - end offset, excluded
         * @param {number} [padX=0] - x padding
         * @param {number} [padY=0] - y padding
         */
        addVerticesMatrix(matrix: Matrix, vertices: Float32Array, beginOffset: number, endOffset: number, padX?: number, padY?: number): void;
        /**
         * Adds other Bounds.
         *
         * @param {PIXI.Bounds} bounds - The Bounds to be added
         */
        addBounds(bounds: Bounds): void;
        /**
         * Adds other Bounds, masked with Bounds.
         *
         * @param {PIXI.Bounds} bounds - The Bounds to be added.
         * @param {PIXI.Bounds} mask - TODO
         */
        addBoundsMask(bounds: Bounds, mask: Bounds): void;
        /**
         * Adds other Bounds, multiplied by matrix. Bounds shouldn't be empty.
         *
         * @param {PIXI.Bounds} bounds - other bounds
         * @param {PIXI.Matrix} matrix - multiplicator
         */
        addBoundsMatrix(bounds: Bounds, matrix: Matrix): void;
        /**
         * Adds other Bounds, masked with Rectangle.
         *
         * @param {PIXI.Bounds} bounds - TODO
         * @param {PIXI.Rectangle} area - TODO
         */
        addBoundsArea(bounds: Bounds, area: Rectangle): void;
        /**
         * Pads bounds object, making it grow in all directions.
         * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
         *
         * @param {number} [paddingX=0] - The horizontal padding amount.
         * @param {number} [paddingY=0] - The vertical padding amount.
         */
        pad(paddingX?: number, paddingY?: number): void;
        /**
         * Adds padded frame. (x0, y0) should be strictly less than (x1, y1)
         *
         * @param {number} x0 - left X of frame
         * @param {number} y0 - top Y of frame
         * @param {number} x1 - right X of frame
         * @param {number} y1 - bottom Y of frame
         * @param {number} padX - padding X
         * @param {number} padY - padding Y
         */
        addFramePad(x0: number, y0: number, x1: number, y1: number, padX: number, padY: number): void;
    }

    export interface Container extends GlobalMixins.Container, DisplayObject {
    }

    /**
     * Container is a general-purpose display object that holds children. It also adds built-in support for advanced
     * rendering features like masking and filtering.
     *
     * It is the base class of all display objects that act as a container for other objects, including Graphics
     * and Sprite.
     *
     * ```js
     *
     * let container = new Container();
     * let sprite = Sprite.from("https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png");
     *
     * sprite.width = 512;
     * sprite.height = 512;
     *
     * // Adds a sprite as a child to this container. As a result, the sprite will be rendered whenever the container
     * // is rendered.
     * container.addChild(sprite);
     *
     * // Blurs whatever is rendered by the container
     * container.filters = [new BlurFilter()];
     *
     * // Only the contents within a circle at the center should be rendered onto the screen.
     * container.mask = new Graphics()
     *  .beginFill(0xffffff)
     *  .drawCircle(sprite.width / 2, sprite.height / 2, Math.min(sprite.width, sprite.height) / 2)
     *  .endFill();
     * ```
     *
     * @class
     * @extends PIXI.DisplayObject
     * @memberof PIXI
     */
    export class Container extends DisplayObject extends PIXI.utils.EventEmitter {
        readonly children: DisplayObject[];
        sortableChildren: boolean;
        sortDirty: boolean;
        parent: Container;
        containerUpdateTransform: () => void;
        protected _width: number;
        protected _height: number;
        constructor();
        /**
         * Overridable method that can be used by Container subclasses whenever the children array is modified
         *
         * @protected
         */
        protected onChildrenChange(_length?: number): void;
        /**
         * Adds one or more children to the container.
         *
         * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
         *
         * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to add to the container
         * @return {PIXI.DisplayObject} The first child that was added.
         */
        addChild<T extends DisplayObject[]>(...children: T): T[0];
        /**
         * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
         *
         * @param {PIXI.DisplayObject} child - The child to add
         * @param {number} index - The index to place the child in
         * @return {PIXI.DisplayObject} The child that was added.
         */
        addChildAt<T extends DisplayObject>(child: T, index: number): T;
        /**
         * Swaps the position of 2 Display Objects within this container.
         *
         * @param {PIXI.DisplayObject} child - First display object to swap
         * @param {PIXI.DisplayObject} child2 - Second display object to swap
         */
        swapChildren(child: DisplayObject, child2: DisplayObject): void;
        /**
         * Returns the index position of a child DisplayObject instance
         *
         * @param {PIXI.DisplayObject} child - The DisplayObject instance to identify
         * @return {number} The index position of the child display object to identify
         */
        getChildIndex(child: DisplayObject): number;
        /**
         * Changes the position of an existing child in the display object container
         *
         * @param {PIXI.DisplayObject} child - The child DisplayObject instance for which you want to change the index number
         * @param {number} index - The resulting index number for the child display object
         */
        setChildIndex(child: DisplayObject, index: number): void;
        /**
         * Returns the child at the specified index
         *
         * @param {number} index - The index to get the child at
         * @return {PIXI.DisplayObject} The child at the given index, if any.
         */
        getChildAt(index: number): DisplayObject;
        /**
         * Removes one or more children from the container.
         *
         * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to remove
         * @return {PIXI.DisplayObject} The first child that was removed.
         */
        removeChild<T extends DisplayObject[]>(...children: T): T[0];
        /**
         * Removes a child from the specified index position.
         *
         * @param {number} index - The index to get the child from
         * @return {PIXI.DisplayObject} The child that was removed.
         */
        removeChildAt(index: number): DisplayObject;
        /**
         * Removes all children from this container that are within the begin and end indexes.
         *
         * @param {number} [beginIndex=0] - The beginning position.
         * @param {number} [endIndex=this.children.length] - The ending position. Default value is size of the container.
         * @returns {PIXI.DisplayObject[]} List of removed children
         */
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        /**
         * Sorts children by zIndex. Previous order is maintained for 2 children with the same zIndex.
         */
        sortChildren(): void;
        /**
         * Updates the transform on all children of this container for rendering
         */
        updateTransform(): void;
        /**
         * Recalculates the bounds of the container.
         *
         * This implementation will automatically fit the children's bounds into the calculation. Each child's bounds
         * is limited to its mask's bounds or filterArea, if any is applied.
         */
        calculateBounds(): void;
        /**
         * Retrieves the local bounds of the displayObject as a rectangle object.
         *
         * Calling `getLocalBounds` may invalidate the `_bounds` of the whole subtree below. If using it inside a render()
         * call, it is advised to call `getBounds()` immediately after to recalculate the world bounds of the subtree.
         *
         * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
         * @param {boolean} [skipChildrenUpdate=false] - Setting to `true` will stop re-calculation of children transforms,
         *  it was default behaviour of pixi 4.0-5.2 and caused many problems to users.
         * @return {PIXI.Rectangle} The rectangular bounding area.
         */
        getLocalBounds(rect?: Rectangle, skipChildrenUpdate?: boolean): Rectangle;
        /**
         * Recalculates the content bounds of this object. This should be overriden to
         * calculate the bounds of this specific object (not including children).
         *
         * @protected
         */
        protected _calculateBounds(): void;
        /**
         * Renders the object using the WebGL renderer.
         *
         * The [_render]{@link PIXI.Container#_render} method is be overriden for rendering the contents of the
         * container itself. This `render` method will invoke it, and also invoke the `render` methods of all
         * children afterward.
         *
         * If `renderable` or `visible` is false or if `worldAlpha` is not positive, this implementation will entirely
         * skip rendering. See {@link PIXI.DisplayObject} for choosing between `renderable` or `visible`. Generally,
         * setting alpha to zero is not recommended for purely skipping rendering.
         *
         * When your scene becomes large (especially when it is larger than can be viewed in a single screen), it is
         * advised to employ **culling** to automatically skip rendering objects outside of the current screen. The
         * [@pixi-essentials/cull]{@link https://www.npmjs.com/package/@pixi-essentials/cull} and
         * [pixi-cull]{@link https://www.npmjs.com/package/pixi-cull} packages do this out of the box.
         *
         * The [renderAdvanced]{@link PIXI.Container#renderAdvanced} method is internally used when when masking or
         * filtering is applied on a container. This does, however, break batching and can affect performance when
         * masking and filtering is applied extensively throughout the scene graph.
         *
         * @param {PIXI.Renderer} renderer - The renderer
         */
        render(renderer: Renderer): void;
        /**
         * Render the object using the WebGL renderer and advanced features.
         *
         * @protected
         * @param {PIXI.Renderer} renderer - The renderer
         */
        protected renderAdvanced(renderer: Renderer): void;
        /**
         * To be overridden by the subclasses.
         *
         * @protected
         * @param {PIXI.Renderer} renderer - The renderer
         */
        protected _render(_renderer: Renderer): void;
        /**
         * Removes all internal references and listeners as well as removes children from the display list.
         * Do not use a Container after calling `destroy`.
         *
         * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
         *  method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the texture of the child sprite
         * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the base texture of the child sprite
         */
        destroy(options?: IDestroyOptions | boolean): void;
        /**
         * The width of the Container, setting this will actually modify the scale to achieve the value set
         *
         * @member {number}
         */
        get width(): number;
        set width(value: number);
        /**
         * The height of the Container, setting this will actually modify the scale to achieve the value set
         *
         * @member {number}
         */
        get height(): number;
        set height(value: number);
    }


    /**
     * The base class for all objects that are rendered on the screen.
     *
     * This is an abstract class and can not be used on its own; rather it should be extended.
     *
     * ## Display objects implemented in PixiJS
     *
     * | Display Object                  | Description                                                           |
     * | ------------------------------- | --------------------------------------------------------------------- |
     * | {@link PIXI.Container}          | Adds support for `children` to DisplayObject                          |
     * | {@link PIXI.Graphics}           | Shape-drawing display object similar to the Canvas API                |
     * | {@link PIXI.Sprite}             | Draws textures (i.e. images)                                          |
     * | {@link PIXI.Text}               | Draws text using the Canvas API internally                            |
     * | {@link PIXI.BitmapText}         | More scaleable solution for text rendering, reusing glyph textures    |
     * | {@link PIXI.TilingSprite}       | Draws textures/images in a tiled fashion                              |
     * | {@link PIXI.AnimatedSprite}     | Draws an animation of multiple images                                 |
     * | {@link PIXI.Mesh}               | Provides a lower-level API for drawing meshes with custom data        |
     * | {@link PIXI.NineSlicePlane}     | Mesh-related                                                          |
     * | {@link PIXI.SimpleMesh}         | v4-compatible mesh                                                    |
     * | {@link PIXI.SimplePlane}        | Mesh-related                                                          |
     * | {@link PIXI.SimpleRope}         | Mesh-related                                                          |
     *
     * ## Transforms
     *
     * The [transform]{@link DisplayObject#transform} of a display object describes the projection from its
     * local coordinate space to its parent's local coordinate space. The following properties are derived
     * from the transform:
     *
     * <table>
     *   <thead>
     *     <tr>
     *       <th>Property</th>
     *       <th>Description</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>[pivot]{@link PIXI.DisplayObject#pivot}</td>
     *       <td>
     *         Invariant under rotation, scaling, and skewing. The projection of into the parent's space of the pivot
     *         is equal to position, regardless of the other three transformations. In other words, It is the center of
     *         rotation, scaling, and skewing.
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>[position]{@link PIXI.DisplayObject#position}</td>
     *       <td>
     *         Translation. This is the position of the [pivot]{@link PIXI.DisplayObject#pivot} in the parent's local
     *         space. The default value of the pivot is the origin (0,0). If the top-left corner of your display object
     *         is (0,0) in its local space, then the position will be its top-left corner in the parent's local space.
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>[scale]{@link PIXI.DisplayObject#scale}</td>
     *       <td>
     *         Scaling. This will stretch (or compress) the display object's projection. The scale factors are along the
     *         local coordinate axes. In other words, the display object is scaled before rotated or skewed. The center
     *         of scaling is the [pivot]{@link PIXI.DisplayObject#pivot}.
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>[rotation]{@link PIXI.DisplayObject#rotation}</td>
     *       <td>
     *          Rotation. This will rotate the display object's projection by this angle (in radians).
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>[skew]{@link PIXI.DisplayObject#skew}</td>
     *       <td>
     *         <p>Skewing. This can be used to deform a rectangular display object into a parallelogram.</p>
     *         <p>
     *         In PixiJS, skew has a slightly different behaviour than the conventional meaning. It can be
     *         thought of the net rotation applied to the coordinate axes (separately). For example, if "skew.x" is
     *         ⍺ and "skew.y" is β, then the line x = 0 will be rotated by ⍺ (y = -x*cot⍺) and the line y = 0 will be
     *         rotated by β (y = x*tanβ). A line y = x*tanϴ (i.e. a line at angle ϴ to the x-axis in local-space) will
     *         be rotated by an angle between ⍺ and β.
     *         </p>
     *         <p>
     *         It can be observed that if skew is applied equally to both axes, then it will be equivalent to applying
     *         a rotation. Indeed, if "skew.x" = -ϴ and "skew.y" = ϴ, it will produce an equivalent of "rotation" = ϴ.
     *         </p>
     *         <p>
     *         Another quite interesting observation is that "skew.x", "skew.y", rotation are communtative operations. Indeed,
     *         because rotation is essentially a careful combination of the two.
     *         </p>
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>angle</td>
     *       <td>Rotation. This is an alias for [rotation]{@link PIXI.DisplayObject#rotation}, but in degrees.</td>
     *     </tr>
     *     <tr>
     *       <td>x</td>
     *       <td>Translation. This is an alias for position.x!</td>
     *     </tr>
     *     <tr>
     *       <td>y</td>
     *       <td>Translation. This is an alias for position.y!</td>
     *     </tr>
     *     <tr>
     *       <td>width</td>
     *       <td>
     *         Implemented in [Container]{@link PIXI.Container}. Scaling. The width property calculates scale.x by dividing
     *         the "requested" width by the local bounding box width. It is indirectly an abstraction over scale.x, and there
     *         is no concept of user-defined width.
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>height</td>
     *       <td>
     *         Implemented in [Container]{@link PIXI.Container}. Scaling. The height property calculates scale.y by dividing
     *         the "requested" height by the local bounding box height. It is indirectly an abstraction over scale.y, and there
     *         is no concept of user-defined height.
     *       </td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * ## Bounds
     *
     * The bounds of a display object is defined by the minimum axis-aligned rectangle in world space that can fit
     * around it. The abstract `calculateBounds` method is responsible for providing it (and it should use the
     * `worldTransform` to calculate in world space).
     *
     * There are a few additional types of bounding boxes:
     *
     * | Bounds                | Description                                                                              |
     * | --------------------- | ---------------------------------------------------------------------------------------- |
     * | World Bounds          | This is synonymous is the regular bounds described above. See `getBounds()`.             |
     * | Local Bounds          | This the axis-aligned bounding box in the parent's local space. See `getLocalBounds()`.  |
     * | Render Bounds         | The bounds, but including extra rendering effects like filter padding.                   |
     * | Projected Bounds      | The bounds of the projected display object onto the screen. Usually equals world bounds. |
     * | Relative Bounds       | The bounds of a display object when projected onto a ancestor's (or parent's) space.     |
     * | Natural Bounds        | The bounds of an object in its own local space (not parent's space, like in local bounds)|
     * | Content Bounds        | The natural bounds when excluding all children of a `Container`.                         |
     *
     * ### calculateBounds
     *
     * [Container]{@link Container} already implements `calculateBounds` in a manner that includes children.
     *
     * But for a non-Container display object, the `calculateBounds` method must be overridden in order for `getBounds` and
     * `getLocalBounds` to work. This method must write the bounds into `this._bounds`.
     *
     * Generally, the following technique works for most simple cases: take the list of points
     * forming the "hull" of the object (i.e. outline of the object's shape), and then add them
     * using {@link PIXI.Bounds#addPointMatrix}.
     *
     * ```js
     * calculateBounds(): void
     * {
     *     const points = [...];
     *
     *     for (let i = 0, j = points.length; i < j; i++)
     *     {
     *         this._bounds.addPointMatrix(this.worldTransform, points[i]);
     *     }
     * }
     * ```
     *
     * You can optimize this for a large number of points by using {@link PIXI.Bounds#addVerticesMatrix} to pass them
     * in one array together.
     *
     * ## Alpha
     *
     * This alpha sets a display object's **relative opacity** w.r.t its parent. For example, if the alpha of a display
     * object is 0.5 and its parent's alpha is 0.5, then it will be rendered with 25% opacity (assuming alpha is not
     * applied on any ancestor further up the chain).
     *
     * The alpha with which the display object will be rendered is called the [worldAlpha]{@link PIXI.DisplayObject#worldAlpha}.
     *
     * ## Renderable vs Visible
     *
     * The `renderable` and `visible` properties can be used to prevent a display object from being rendered to the
     * screen. However, there is a subtle difference between the two. When using `renderable`, the transforms  of the display
     * object (and its children subtree) will continue to be calculated. When using `visible`, the transforms will not
     * be calculated.
     *
     * It is recommended that applications use the `renderable` property for culling. See
     * [@pixi-essentials/cull]{@link https://www.npmjs.com/package/@pixi-essentials/cull} or
     * [pixi-cull]{@link https://www.npmjs.com/package/pixi-cull} for more details.
     *
     * Otherwise, to prevent an object from rendering in the general-purpose sense - `visible` is the property to use. This
     * one is also better in terms of performance.
     *
     * @class
     * @extends PIXI.utils.EventEmitter
     * @memberof PIXI
     */
    export abstract class DisplayObject extends InteractiveTarget  {
        name: string;
        cacheAsBitmap: boolean;
        cacheAsBitmapResolution: number;
        _cacheAsBitmapResolution: number;
        _cacheAsBitmap: boolean;
        _calculateCachedBounds(): void;
        _destroyCachedDisplayObject(): void;
        abstract sortDirty: boolean;
        parent: Container;
        worldAlpha: number;
        transform: Transform;
        alpha: number;
        visible: boolean;
        renderable: boolean;
        filterArea: Rectangle;
        filters: Filter[] | null;
        isSprite: boolean;
        isMask: boolean;
        _lastSortedIndex: number;
        _mask: Container | MaskData;
        _bounds: Bounds;
        _localBounds: Bounds;
        protected _zIndex: number;
        protected _enabledFilters: Filter[];
        protected _boundsID: number;
        protected _boundsRect: Rectangle;
        protected _localBoundsRect: Rectangle;
        protected _destroyed: boolean;
        private _maskRefCount;
        private tempDisplayObjectParent;
        displayObjectUpdateTransform: () => void;
        /**
         * Mixes all enumerable properties and methods from a source object to DisplayObject.
         *
         * @param {object} source - The source of properties and methods to mix in.
         */
        static mixin(source: any): void;
        constructor();
        /**
         * Fired when this DisplayObject is added to a Container.
         *
         * @instance
         * @event added
         * @param {PIXI.Container} container - The container added to.
         */
        /**
         * Fired when this DisplayObject is removed from a Container.
         *
         * @instance
         * @event removed
         * @param {PIXI.Container} container - The container removed from.
         */
        /**
         * Fired when this DisplayObject is destroyed.
         *
         * @instance
         * @event destroyed
         */
        /**
         * Readonly flag for destroyed display objects.
         */
        get destroyed(): boolean;
        /**
         * Recalculates the bounds of the display object.
         */
        abstract calculateBounds(): void;
        abstract removeChild(child: DisplayObject): void;
        /**
         * Renders the object using the WebGL renderer.
         *
         * @param {PIXI.Renderer} renderer - The renderer.
         */
        abstract render(renderer: Renderer): void;
        /**
         * Recursively updates transform of all objects from the root to this one
         * internal function for toLocal()
         */
        protected _recursivePostUpdateTransform(): void;
        /**
         * Updates the object transform for rendering.
         *
         * TODO - Optimization pass!
         */
        updateTransform(): void;
        /**
         * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link PIXI.Rectangle}.
         *
         * This method is expensive on containers with a large subtree (like the stage). This is because the bounds
         * of a container depend on its children's bounds, which recursively causes all bounds in the subtree to
         * be recalculated. The upside, however, is that calling `getBounds` once on a container will indeed update
         * the bounds of all children (the whole subtree, in fact). This side effect should be exploited by using
         * `displayObject._bounds.getRectangle()` when traversing through all the bounds in a scene graph. Otherwise,
         * calling `getBounds` on each object in a subtree will cause the total cost to increase quadratically as
         * its height increases.
         *
         * * The transforms of all objects in a container's **subtree** and of all **ancestors** are updated.
         * * The world bounds of all display objects in a container's **subtree** will also be recalculated.
         *
         * The `_bounds` object stores the last calculation of the bounds. You can use to entirely skip bounds
         * calculation if needed.
         *
         * ```js
         * const lastCalculatedBounds = displayObject._bounds.getRectangle(optionalRect);
         * ```
         *
         * Do know that usage of `getLocalBounds` can corrupt the `_bounds` of children (the whole subtree, actually). This
         * is a known issue that has not been solved. See [getLocalBounds]{@link PIXI.DisplayObject#getLocalBounds} for more
         * details.
         *
         * `getBounds` should be called with `skipUpdate` equal to `true` in a render() call. This is because the transforms
         * are guaranteed to be update-to-date. In fact, recalculating inside a render() call may cause corruption in certain
         * cases.
         *
         * @param {boolean} [skipUpdate] - Setting to `true` will stop the transforms of the scene graph from
         *  being updated. This means the calculation returned MAY be out of date BUT will give you a
         *  nice performance boost.
         * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
         * @return {PIXI.Rectangle} The minimum axis-aligned rectangle in world space that fits around this object.
         */
        getBounds(skipUpdate?: boolean, rect?: Rectangle): Rectangle;
        /**
         * Retrieves the local bounds of the displayObject as a rectangle object.
         *
         * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
         * @return {PIXI.Rectangle} The rectangular bounding area.
         */
        getLocalBounds(rect?: Rectangle): Rectangle;
        /**
         * Calculates the global position of the display object.
         *
         * @param {PIXI.IPointData} position - The world origin to calculate from.
         * @param {PIXI.Point} [point] - A Point object in which to store the value, optional
         *  (otherwise will create a new Point).
         * @param {boolean} [skipUpdate=false] - Should we skip the update transform.
         * @return {PIXI.Point} A point object representing the position of this object.
         */
        toGlobal<P extends IPointData = Point>(position: IPointData, point?: P, skipUpdate?: boolean): P;
        /**
         * Calculates the local position of the display object relative to another point.
         *
         * @param {PIXI.IPointData} position - The world origin to calculate from.
         * @param {PIXI.DisplayObject} [from] - The DisplayObject to calculate the global position from.
         * @param {PIXI.Point} [point] - A Point object in which to store the value, optional
         *  (otherwise will create a new Point).
         * @param {boolean} [skipUpdate=false] - Should we skip the update transform
         * @return {PIXI.Point} A point object representing the position of this object
         */
        toLocal<P extends IPointData = Point>(position: IPointData, from?: DisplayObject, point?: P, skipUpdate?: boolean): P;
        /**
         * Set the parent Container of this DisplayObject.
         *
         * @param {PIXI.Container} container - The Container to add this DisplayObject to.
         * @return {PIXI.Container} The Container that this DisplayObject was added to.
         */
        setParent(container: Container): Container;
        /**
         * Convenience function to set the position, scale, skew and pivot at once.
         *
         * @param {number} [x=0] - The X position
         * @param {number} [y=0] - The Y position
         * @param {number} [scaleX=1] - The X scale value
         * @param {number} [scaleY=1] - The Y scale value
         * @param {number} [rotation=0] - The rotation
         * @param {number} [skewX=0] - The X skew value
         * @param {number} [skewY=0] - The Y skew value
         * @param {number} [pivotX=0] - The X pivot value
         * @param {number} [pivotY=0] - The Y pivot value
         * @return {PIXI.DisplayObject} The DisplayObject instance
         */
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, pivotX?: number, pivotY?: number): this;
        /**
         * Base destroy method for generic display objects. This will automatically
         * remove the display object from its parent Container as well as remove
         * all current event listeners and internal references. Do not use a DisplayObject
         * after calling `destroy()`.
         *
         */
        destroy(_options?: IDestroyOptions | boolean): void;
        /**
         * @protected
         * @member {PIXI.Container}
         */
        get _tempDisplayObjectParent(): TemporaryDisplayObject;
        /**
         * Used in Renderer, cacheAsBitmap and other places where you call an `updateTransform` on root
         *
         * ```
         * const cacheParent = elem.enableTempParent();
         * elem.updateTransform();
         * elem.disableTempParent(cacheParent);
         * ```
         *
         * @returns {PIXI.Container} current parent
         */
        enableTempParent(): Container;
        /**
         * Pair method for `enableTempParent`
         *
         * @param {PIXI.Container} cacheParent - Actual parent of element
         */
        disableTempParent(cacheParent: Container): void;
        /**
         * The position of the displayObject on the x axis relative to the local coordinates of the parent.
         * An alias to position.x
         *
         * @member {number}
         */
        get x(): number;
        set x(value: number);
        /**
         * The position of the displayObject on the y axis relative to the local coordinates of the parent.
         * An alias to position.y
         *
         * @member {number}
         */
        get y(): number;
        set y(value: number);
        /**
         * Current transform of the object based on world (parent) factors.
         *
         * @member {PIXI.Matrix}
         * @readonly
         */
        get worldTransform(): Matrix;
        /**
         * Current transform of the object based on local factors: position, scale, other stuff.
         *
         * @member {PIXI.Matrix}
         * @readonly
         */
        get localTransform(): Matrix;
        /**
         * The coordinate of the object relative to the local coordinates of the parent.
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get position(): ObservablePoint;
        set position(value: ObservablePoint);
        /**
         * The scale factors of this object along the local coordinate axes.
         *
         * The default scale is (1, 1).
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get scale(): ObservablePoint;
        set scale(value: ObservablePoint);
        /**
         * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
         * is the projection of `pivot` in the parent's local space.
         *
         * By default, the pivot is the origin (0, 0).
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get pivot(): ObservablePoint;
        set pivot(value: ObservablePoint);
        /**
         * The skew factor for the object in radians.
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get skew(): ObservablePoint;
        set skew(value: ObservablePoint);
        /**
         * The rotation of the object in radians.
         * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
         *
         * @member {number}
         */
        get rotation(): number;
        set rotation(value: number);
        /**
         * The angle of the object in degrees.
         * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
         *
         * @member {number}
         */
        get angle(): number;
        set angle(value: number);
        /**
         * The zIndex of the displayObject.
         *
         * If a container has the sortableChildren property set to true, children will be automatically
         * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
         * and thus rendered on top of other display objects within the same container.
         *
         * @member {number}
         * @see PIXI.Container#sortableChildren
         */
        get zIndex(): number;
        set zIndex(value: number);
        /**
         * Indicates if the object is globally visible.
         *
         * @member {boolean}
         * @readonly
         */
        get worldVisible(): boolean;
        /**
         * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
         * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
         * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
         * utilities shape clipping. To remove a mask, set this property to `null`.
         *
         * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
         *
         * @example
         * const graphics = new PIXI.Graphics();
         * graphics.beginFill(0xFF3300);
         * graphics.drawRect(50, 250, 100, 100);
         * graphics.endFill();
         *
         * const sprite = new PIXI.Sprite(texture);
         * sprite.mask = graphics;
         *
         * @todo At the moment, PIXI.CanvasRenderer doesn't support PIXI.Sprite as mask.
         * @member {PIXI.Container|PIXI.MaskData|null}
         */
        get mask(): Container | MaskData | null;
        set mask(value: Container | MaskData | null);
    }

    export interface IDestroyOptions {
        children?: boolean;
        texture?: boolean;
        baseTexture?: boolean;
    }

    /**
     * @private
     */
    export class TemporaryDisplayObject extends DisplayObject {
        calculateBounds: () => null;
        removeChild: (child: DisplayObject) => null;
        render: (renderer: Renderer) => null;
        sortDirty: boolean;
    }


    /////////////////////////////////////////////////
    ////////////////extract//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * This class provides renderer-specific plugins for exporting content from a renderer.
     * For instance, these plugins can be used for saving an Image, Canvas element or for exporting the raw image data (pixels).
     *
     * Do not instantiate these plugins directly. It is available from the `renderer.plugins` property.
     * See {@link PIXI.CanvasRenderer#plugins} or {@link PIXI.Renderer#plugins}.
     * @example
     * // Create a new app (will auto-add extract plugin to renderer)
     * const app = new PIXI.Application();
     *
     * // Draw a red circle
     * const graphics = new PIXI.Graphics()
     *     .beginFill(0xFF0000)
     *     .drawCircle(0, 0, 50);
     *
     * // Render the graphics as an HTMLImageElement
     * const image = app.renderer.plugins.extract.image(graphics);
     * document.body.appendChild(image);
     * @class
     * @memberof PIXI
     */
    class Extract_2 implements IRendererPlugin {
        private renderer;
        /**
         * @param {PIXI.Renderer} renderer - A reference to the current renderer
         */
        constructor(renderer: Renderer);
        /**
         * Will return a HTML Image of the target
         *
         * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
         *  to convert. If left empty will use the main renderer
         * @param {string} [format] - Image format, e.g. "image/jpeg" or "image/webp".
         * @param {number} [quality] - JPEG or Webp compression from 0 to 1. Default is 0.92.
         * @return {HTMLImageElement} HTML Image of the target
         */
        image(target: DisplayObject | RenderTexture, format?: string, quality?: number): HTMLImageElement;
        /**
         * Will return a a base64 encoded string of this target. It works by calling
         *  `Extract.getCanvas` and then running toDataURL on that.
         *
         * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
         *  to convert. If left empty will use the main renderer
         * @param {string} [format] - Image format, e.g. "image/jpeg" or "image/webp".
         * @param {number} [quality] - JPEG or Webp compression from 0 to 1. Default is 0.92.
         * @return {string} A base64 encoded string of the texture.
         */
        base64(target: DisplayObject | RenderTexture, format?: string, quality?: number): string;
        /**
         * Creates a Canvas element, renders this target to it and then returns it.
         *
         * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
         *  to convert. If left empty will use the main renderer
         * @return {HTMLCanvasElement} A Canvas element with the texture rendered on.
         */
        canvas(target: DisplayObject | RenderTexture): HTMLCanvasElement;
        /**
         * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
         * order, with integer values between 0 and 255 (included).
         *
         * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
         *  to convert. If left empty will use the main renderer
         * @return {Uint8Array} One-dimensional array containing the pixel data of the entire texture
         */
        pixels(target?: DisplayObject | RenderTexture): Uint8Array;
        /**
         * Destroys the extract
         *
         */
        destroy(): void;
        /**
         * Takes premultiplied pixel data and produces regular pixel data
         *
         * @private
         * @param {number[] | Uint8Array | Uint8ClampedArray} pixels - array of pixel data
         * @param {number[] | Uint8Array | Uint8ClampedArray} out - output array
         */
        static arrayPostDivide(pixels: number[] | Uint8Array | Uint8ClampedArray, out: number[] | Uint8Array | Uint8ClampedArray): void;
    }
    export { Extract_2 as Extract }

    /////////////////////////////////////////////////
    ////////////////graphics//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * Utilities for arc curves
     * @class
     * @private
     */
    class ArcUtils {
        /**
         * The arcTo() method creates an arc/curve between two tangents on the canvas.
         *
         * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
         *
         * @private
         * @param {number} x1 - The x-coordinate of the beginning of the arc
         * @param {number} y1 - The y-coordinate of the beginning of the arc
         * @param {number} x2 - The x-coordinate of the end of the arc
         * @param {number} y2 - The y-coordinate of the end of the arc
         * @param {number} radius - The radius of the arc
         * @return {object} If the arc length is valid, return center of circle, radius and other info otherwise `null`.
         */
        static curveTo(x1: number, y1: number, x2: number, y2: number, radius: number, points: Array<number>): IArcLikeShape;
        /**
         * The arc method creates an arc/curve (used to create circles, or parts of circles).
         *
         * @private
         * @param {number} startX - Start x location of arc
         * @param {number} startY - Start y location of arc
         * @param {number} cx - The x-coordinate of the center of the circle
         * @param {number} cy - The y-coordinate of the center of the circle
         * @param {number} radius - The radius of the circle
         * @param {number} startAngle - The starting angle, in radians (0 is at the 3 o'clock position
         *  of the arc's circle)
         * @param {number} endAngle - The ending angle, in radians
         * @param {boolean} anticlockwise - Specifies whether the drawing should be
         *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
         *  indicates counter-clockwise.
         * @param {number[]} points - Collection of points to add to
         */
        static arc(_startX: number, _startY: number, cx: number, cy: number, radius: number, startAngle: number, endAngle: number, _anticlockwise: boolean, points: Array<number>): void;
    }

    /**
     * A structure to hold interim batch objects for Graphics.
     * @class
     * @memberof PIXI.graphicsUtils
     */
    class BatchPart {
        style: LineStyle | FillStyle;
        start: number;
        size: number;
        attribStart: number;
        attribSize: number;
        constructor();
        /**
         * Begin batch part
         *
         * @param {PIXI.FillStyle | PIXI.LineStyle} style
         * @param {number} startIndex
         * @param {number} attribStart
         */
        begin(style: LineStyle | FillStyle, startIndex: number, attribStart: number): void;
        /**
         * End batch part
         *
         * @param {number} endIndex
         * @param {number} endAttrib
         */
        end(endIndex: number, endAttrib: number): void;
        reset(): void;
    }

    /**
     * Utilities for bezier curves
     * @class
     * @private
     */
    class BezierUtils {
        /**
         * Calculate length of bezier curve.
         * Analytical solution is impossible, since it involves an integral that does not integrate in general.
         * Therefore numerical solution is used.
         *
         * @private
         * @param {number} fromX - Starting point x
         * @param {number} fromY - Starting point y
         * @param {number} cpX - Control point x
         * @param {number} cpY - Control point y
         * @param {number} cpX2 - Second Control point x
         * @param {number} cpY2 - Second Control point y
         * @param {number} toX - Destination point x
         * @param {number} toY - Destination point y
         * @return {number} Length of bezier curve
         */
        static curveLength(fromX: number, fromY: number, cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): number;
        /**
         * Calculate the points for a bezier curve and then draws it.
         *
         * Ignored from docs since it is not directly exposed.
         *
         * @ignore
         * @param {number} cpX - Control point x
         * @param {number} cpY - Control point y
         * @param {number} cpX2 - Second Control point x
         * @param {number} cpY2 - Second Control point y
         * @param {number} toX - Destination point x
         * @param {number} toY - Destination point y
         * @param {number[]} points - Path array to push points into
         */
        static curveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number, points: Array<number>): void;
    }

    /**
     * Builds a line to draw
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.GraphicsData} graphicsData - The graphics object containing all the necessary properties
     * @param {PIXI.GraphicsGeometry} graphicsGeometry - Geometry where to append output
     */
    function buildLine(graphicsData: GraphicsData, graphicsGeometry: GraphicsGeometry): void;

    /**
     * Fill style object for Graphics.
     *
     * @class
     * @memberof PIXI
     */
    export class FillStyle {
        /**
         * The hex color value used when coloring the Graphics object.
         *
         * @default 0xFFFFFF
         */
        color: number;
        /** The alpha value used when filling the Graphics object. */
        alpha: number;
        /**
         * The texture to be used for the fill.
         *
         * @member {PIXI.Texture}
         * @default 0
         */
        texture: Texture;
        /**
         * The transform applied to the texture.
         *
         * @member {PIXI.Matrix}
         * @default null
         */
        matrix: Matrix;
        /** If the current fill is visible. */
        visible: boolean;
        constructor();
        /**
         * Clones the object
         *
         * @return {PIXI.FillStyle}
         */
        clone(): FillStyle;
        /**
         * Reset
         */
        reset(): void;
        /**
         * Destroy and don't use after this
         */
        destroy(): void;
    }

    export interface Graphics extends GlobalMixins.Graphics, Container {
    }

    /**
     * The Graphics class is primarily used to render primitive shapes such as lines, circles and
     * rectangles to the display, and to color and fill them.  However, you can also use a Graphics
     * object to build a list of primitives to use as a mask, or as a complex hitArea.
     *
     * Please note that due to legacy naming conventions, the behavior of some functions in this class
     * can be confusing.  Each call to `drawRect()`, `drawPolygon()`, etc. actually stores that primitive
     * in the Geometry class's GraphicsGeometry object for later use in rendering or hit testing - the
     * functions do not directly draw anything to the screen.  Similarly, the `clear()` function doesn't
     * change the screen, it simply resets the list of primitives, which can be useful if you want to
     * rebuild the contents of an existing Graphics object.
     *
     * Once a GraphicsGeometry list is built, you can re-use it in other Geometry objects as
     * an optimization, by passing it into a new Geometry object's constructor.  Because of this
     * properly dereference each GraphicsGeometry and prevent memory leaks.
     *
     * @class
     * @extends PIXI.Container
     * @memberof PIXI
     */
    export class Graphics extends Container {
        /**
         * Temporary point to use for containsPoint
         *
         * @static
         * @private
         */
        static _TEMP_POINT: Point;
        /**
         * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
         * Can be shared between multiple Graphics objects.
         */
        shader: Shader;
        /** Renderer plugin for batching */
        pluginName: string;
        /**
         * Current path
         *
         * @member {PIXI.Polygon}
         * @readonly
         */
        currentPath: Polygon;
        /**
         * A collections of batches! These can be drawn by the renderer batch system.
         *
         * @member {PIXI.IGraphicsBatchElement[]}
         */
        protected batches: Array<IGraphicsBatchElement>;
        /** Update dirty for limiting calculating tints for batches. */
        protected batchTint: number;
        /** Update dirty for limiting calculating batches.*/
        protected batchDirty: number;
        /** Copy of the object vertex data. */
        protected vertexData: Float32Array;
        /**
         * Current fill style
         *
         * @member {PIXI.FillStyle}
         */
        protected _fillStyle: FillStyle;
        /**
         * Current line style
         *
         * @member {PIXI.LineStyle}
         */
        protected _lineStyle: LineStyle;
        /**
         * Current shape transform matrix.
         *
         * @member {PIXI.Matrix}
         */
        protected _matrix: Matrix;
        /** Current hole mode is enabled. */
        protected _holeMode: boolean;
        protected _transformID: number;
        protected _tint: number;
        /**
         * Represents the WebGL state the Graphics required to render, excludes shader and geometry. E.g.,
         * blend mode, culling, depth testing, direction of rendering triangles, backface, etc.
         *
         * @member {PIXI.State}
         */
        private state;
        private _geometry;
        /**
         * Includes vertex positions, face indices, normals, colors, UVs, and
         * custom attributes within buffers, reducing the cost of passing all
         * this data to the GPU. Can be shared between multiple Mesh or Graphics objects.
         *
         * @member {PIXI.GraphicsGeometry}
         * @readonly
         */
        get geometry(): GraphicsGeometry;
        /**
         * @param {PIXI.GraphicsGeometry} [geometry=null] - Geometry to use, if omitted
         *        will create a new GraphicsGeometry instance.
         */
        constructor(geometry?: GraphicsGeometry);
        /**
         * Creates a new Graphics object with the same values as this one.
         * Note that only the geometry of the object is cloned, not its transform (position,scale,etc)
         *
         * @return {PIXI.Graphics} A clone of the graphics object
         */
        clone(): Graphics;
        /**
         * The blend mode to be applied to the graphic shape. Apply a value of
         * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.  Note that, since each
         * primitive in the GraphicsGeometry list is rendered sequentially, modes
         * such as `PIXI.BLEND_MODES.ADD` and `PIXI.BLEND_MODES.MULTIPLY` will
         * be applied per-primitive.
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL;
         * @see PIXI.BLEND_MODES
         */
        set blendMode(value: BLEND_MODES);
        get blendMode(): BLEND_MODES;
        /**
         * The tint applied to each graphic shape. This is a hex value. A value of
         * 0xFFFFFF will remove any tint effect.
         *
         * @member {number}
         * @default 0xFFFFFF
         */
        get tint(): number;
        set tint(value: number);
        /**
         * The current fill style.
         *
         * @member {PIXI.FillStyle}
         * @readonly
         */
        get fill(): FillStyle;
        /**
         * The current line style.
         *
         * @member {PIXI.LineStyle}
         * @readonly
         */
        get line(): LineStyle;
        /**
         * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo()
         * method or the drawCircle() method.
         *
         * @param {number} [width=0] - width of the line to draw, will update the objects stored style
         * @param {number} [color=0x0] - color of the line to draw, will update the objects stored style
         * @param {number} [alpha=1] - alpha of the line to draw, will update the objects stored style
         * @param {number} [alignment=0.5] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outer).
         *        WebGL only.
         * @param {boolean} [native=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        lineStyle(width: number, color?: number, alpha?: number, alignment?: number, native?: boolean): this;
        /**
         * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo()
         * method or the drawCircle() method.
         *
         * @param {object} [options] - Line style options
         * @param {number} [options.width=0] - width of the line to draw, will update the objects stored style
         * @param {number} [options.color=0x0] - color of the line to draw, will update the objects stored style
         * @param {number} [options.alpha=1] - alpha of the line to draw, will update the objects stored style
         * @param {number} [options.alignment=0.5] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outer).
         *        WebGL only.
         * @param {boolean} [options.native=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
         * @param {PIXI.LINE_CAP}[options.cap=PIXI.LINE_CAP.BUTT] - line cap style
         * @param {PIXI.LINE_JOIN}[options.join=PIXI.LINE_JOIN.MITER] - line join style
         * @param {number}[options.miterLimit=10] - miter limit ratio
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        lineStyle(options?: ILineStyleOptions): this;
        /**
         * Like line style but support texture for line fill.
         *
         * @param {object} [options] - Collection of options for setting line style.
         * @param {number} [options.width=0] - width of the line to draw, will update the objects stored style
         * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to use
         * @param {number} [options.color=0x0] - color of the line to draw, will update the objects stored style.
         *  Default 0xFFFFFF if texture present.
         * @param {number} [options.alpha=1] - alpha of the line to draw, will update the objects stored style
         * @param {PIXI.Matrix} [options.matrix=null] - Texture matrix to transform texture
         * @param {number} [options.alignment=0.5] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outer).
         *        WebGL only.
         * @param {boolean} [options.native=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
         * @param {PIXI.LINE_CAP}[options.cap=PIXI.LINE_CAP.BUTT] - line cap style
         * @param {PIXI.LINE_JOIN}[options.join=PIXI.LINE_JOIN.MITER] - line join style
         * @param {number}[options.miterLimit=10] - miter limit ratio
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        lineTextureStyle(options: ILineStyleOptions): this;
        /**
         * Start a polygon object internally
         * @protected
         */
        protected startPoly(): void;
        /**
         * Finish the polygon object.
         * @protected
         */
        finishPoly(): void;
        /**
         * Moves the current drawing position to x, y.
         *
         * @param {number} x - the X coordinate to move to
         * @param {number} y - the Y coordinate to move to
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        moveTo(x: number, y: number): this;
        /**
         * Draws a line using the current line style from the current drawing position to (x, y);
         * The current drawing position is then set to (x, y).
         *
         * @param {number} x - the X coordinate to draw to
         * @param {number} y - the Y coordinate to draw to
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        lineTo(x: number, y: number): this;
        /**
         * Initialize the curve
         *
         * @param {number} [x=0]
         * @param {number} [y=0]
         */
        protected _initCurve(x?: number, y?: number): void;
        /**
         * Calculate the points for a quadratic bezier curve and then draws it.
         * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
         *
         * @param {number} cpX - Control point x
         * @param {number} cpY - Control point y
         * @param {number} toX - Destination point x
         * @param {number} toY - Destination point y
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): this;
        /**
         * Calculate the points for a bezier curve and then draws it.
         *
         * @param {number} cpX - Control point x
         * @param {number} cpY - Control point y
         * @param {number} cpX2 - Second Control point x
         * @param {number} cpY2 - Second Control point y
         * @param {number} toX - Destination point x
         * @param {number} toY - Destination point y
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): this;
        /**
         * The arcTo() method creates an arc/curve between two tangents on the canvas.
         *
         * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
         *
         * @param {number} x1 - The x-coordinate of the first tangent point of the arc
         * @param {number} y1 - The y-coordinate of the first tangent point of the arc
         * @param {number} x2 - The x-coordinate of the end of the arc
         * @param {number} y2 - The y-coordinate of the end of the arc
         * @param {number} radius - The radius of the arc
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
        /**
         * The arc method creates an arc/curve (used to create circles, or parts of circles).
         *
         * @param {number} cx - The x-coordinate of the center of the circle
         * @param {number} cy - The y-coordinate of the center of the circle
         * @param {number} radius - The radius of the circle
         * @param {number} startAngle - The starting angle, in radians (0 is at the 3 o'clock position
         *  of the arc's circle)
         * @param {number} endAngle - The ending angle, in radians
         * @param {boolean} [anticlockwise=false] - Specifies whether the drawing should be
         *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
         *  indicates counter-clockwise.
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
        /**
         * Specifies a simple one-color fill that subsequent calls to other Graphics methods
         * (such as lineTo() or drawCircle()) use when drawing.
         *
         * @param {number} [color=0] - the color of the fill
         * @param {number} [alpha=1] - the alpha of the fill
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        beginFill(color?: number, alpha?: number): this;
        /**
         * Begin the texture fill
         *
         * @param {object} [options] - Object object.
         * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to fill
         * @param {number} [options.color=0xffffff] - Background to fill behind texture
         * @param {number} [options.alpha=1] - Alpha of fill
         * @param {PIXI.Matrix} [options.matrix=null] - Transform matrix
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        beginTextureFill(options?: IFillStyleOptions): this;
        /**
         * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
         *
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        endFill(): this;
        /**
         * Draws a rectangle shape.
         *
         * @param {number} x - The X coord of the top-left of the rectangle
         * @param {number} y - The Y coord of the top-left of the rectangle
         * @param {number} width - The width of the rectangle
         * @param {number} height - The height of the rectangle
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        drawRect(x: number, y: number, width: number, height: number): this;
        /**
         * Draw a rectangle shape with rounded/beveled corners.
         *
         * @param {number} x - The X coord of the top-left of the rectangle
         * @param {number} y - The Y coord of the top-left of the rectangle
         * @param {number} width - The width of the rectangle
         * @param {number} height - The height of the rectangle
         * @param {number} radius - Radius of the rectangle corners
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): this;
        /**
         * Draws a circle.
         *
         * @param {number} x - The X coordinate of the center of the circle
         * @param {number} y - The Y coordinate of the center of the circle
         * @param {number} radius - The radius of the circle
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        drawCircle(x: number, y: number, radius: number): this;
        /**
         * Draws an ellipse.
         *
         * @param {number} x - The X coordinate of the center of the ellipse
         * @param {number} y - The Y coordinate of the center of the ellipse
         * @param {number} width - The half width of the ellipse
         * @param {number} height - The half height of the ellipse
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        drawEllipse(x: number, y: number, width: number, height: number): this;
        drawPolygon(...path: Array<number> | Array<Point>): this;
        drawPolygon(path: Array<number> | Array<Point> | Polygon): this;
        /**
         * Draw any shape.
         *
         * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - Shape to draw
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        drawShape(shape: IShape): this;
        /**
         * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
         *
         * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
         */
        clear(): this;
        /**
         * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and
         * masked with gl.scissor.
         *
         * @returns {boolean} True if only 1 rect.
         */
        isFastRect(): boolean;
        /**
         * Renders the object using the WebGL renderer
         *
         * @param {PIXI.Renderer} renderer - The renderer
         */
        protected _render(renderer: Renderer): void;
        /** Populating batches for rendering. */
        protected _populateBatches(): void;
        /**
         * Renders the batches using the BathedRenderer plugin
         *
         * @param {PIXI.Renderer} renderer - The renderer
         */
        protected _renderBatched(renderer: Renderer): void;
        /**
         * Renders the graphics direct
         *
         * @param {PIXI.Renderer} renderer - The renderer
         */
        protected _renderDirect(renderer: Renderer): void;
        /**
         * Renders specific DrawCall
         *
         * @param {PIXI.Renderer} renderer
         * @param {PIXI.BatchDrawCall} drawCall
         */
        protected _renderDrawCallDirect(renderer: Renderer, drawCall: BatchDrawCall): void;
        /**
         * Resolves shader for direct rendering
         *
         * @param {PIXI.Renderer} renderer - The renderer
         */
        protected _resolveDirectShader(renderer: Renderer): Shader;
        /** Retrieves the bounds of the graphic shape as a rectangle object. */
        protected _calculateBounds(): void;
        /**
         * Tests if a point is inside this graphics object
         *
         * @param {PIXI.IPointData} point - the point to test
         * @return {boolean} the result of the test
         */
        containsPoint(point: IPointData): boolean;
        /** Recalculate the tint by applying tint to batches using Graphics tint. */
        protected calculateTints(): void;
        /**
         * If there's a transform update or a change to the shape of the
         * geometry, recalculate the vertices.
         */
        protected calculateVertices(): void;
        /**
         * Closes the current path.
         *
         * @return {PIXI.Graphics} Returns itself.
         */
        closePath(): this;
        /**
         * Apply a matrix to the positional data.
         *
         * @param {PIXI.Matrix} matrix - Matrix to use for transform current shape.
         * @return {PIXI.Graphics} Returns itself.
         */
        setMatrix(matrix: Matrix): this;
        /**
         * Begin adding holes to the last draw shape
         * IMPORTANT: holes must be fully inside a shape to work
         * Also weirdness ensues if holes overlap!
         * Ellipses, Circles, Rectangles and Rounded Rectangles cannot be holes or host for holes in CanvasRenderer,
         * please use `moveTo` `lineTo`, `quadraticCurveTo` if you rely on pixi-legacy bundle.
         * @return {PIXI.Graphics} Returns itself.
         */
        beginHole(): this;
        /**
         * End adding holes to the last draw shape
         * @return {PIXI.Graphics} Returns itself.
         */
        endHole(): this;
        /**
         * Destroys the Graphics object.
         *
         * @param {object|boolean} [options] - Options parameter. A boolean will act as if all
         *  options have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have
         *  their destroy method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the texture of the child sprite
         * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the base texture of the child sprite
         */
        destroy(options?: IDestroyOptions | boolean): void;
    }

    /**
     * Graphics curves resolution settings. If `adaptive` flag is set to `true`,
     * the resolution is calculated based on the curve's length to ensure better visual quality.
     * Adaptive draw works with `bezierCurveTo` and `quadraticCurveTo`.
     *
     * @static
     * @constant
     * @memberof PIXI
     * @name GRAPHICS_CURVES
     * @type {object}
     * @property {boolean} adaptive=true - flag indicating if the resolution should be adaptive
     * @property {number} maxLength=10 - maximal length of a single segment of the curve (if adaptive = false, ignored)
     * @property {number} minSegments=8 - minimal number of segments in the curve (if adaptive = false, ignored)
     * @property {number} maxSegments=2048 - maximal number of segments in the curve (if adaptive = false, ignored)
     */
    export const GRAPHICS_CURVES: IGraphicsCurvesSettings;

    /**
     * A class to contain data useful for Graphics objects
     *
     * @class
     * @memberof PIXI
     */
    export class GraphicsData {
        shape: IShape;
        lineStyle: LineStyle;
        fillStyle: FillStyle;
        matrix: Matrix;
        type: SHAPES;
        /** The collection of points. */
        points: number[];
        /**
         * The collection of holes.
         *
         * @member {PIXI.GraphicsData[]}
         */
        holes: Array<GraphicsData>;
        /**
         *
         * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
         * @param {PIXI.FillStyle} [fillStyle] - the width of the line to draw
         * @param {PIXI.LineStyle} [lineStyle] - the color of the line to draw
         * @param {PIXI.Matrix} [matrix] - Transform matrix
         */
        constructor(shape: IShape, fillStyle?: FillStyle, lineStyle?: LineStyle, matrix?: Matrix);
        /**
         * Creates a new GraphicsData object with the same values as this one.
         *
         * @return {PIXI.GraphicsData} Cloned GraphicsData object
         */
        clone(): GraphicsData;
        /**
         * Destroys the Graphics data.
         *
         */
        destroy(): void;
    }

    /**
     * The Graphics class contains methods used to draw primitive shapes such as lines, circles and
     * rectangles to the display, and to color and fill them.
     *
     * GraphicsGeometry is designed to not be continually updating the geometry since it's expensive
     * to re-tesselate using **earcut**. Consider using {@link PIXI.Mesh} for this use-case, it's much faster.
     *
     * @class
     * @extends PIXI.BatchGeometry
     * @memberof PIXI
     */
    export class GraphicsGeometry extends BatchGeometry {
        /**
         * The maximum number of points to consider an object "batchable",
         * able to be batched by the renderer's batch system.
    \    */
        static BATCHABLE_SIZE: number;
        /**
         * Minimal distance between points that are considered different.
         * Affects line tesselation.
         */
        closePointEps: number;
        /** Padding to add to the bounds. */
        boundsPadding: number;
        uvsFloat32: Float32Array;
        indicesUint16: Uint16Array | Uint32Array;
        batchable: boolean;
        /** An array of points to draw, 2 numbers per point */
        points: number[];
        /** The collection of colors */
        colors: number[];
        /** The UVs collection */
        uvs: number[];
        /** The indices of the vertices */
        indices: number[];
        /** Reference to the texture IDs. */
        textureIds: number[];
        /**
         * The collection of drawn shapes.
         *
         * @member {PIXI.GraphicsData[]}
         */
        graphicsData: Array<GraphicsData>;
        /**
         * List of current draw calls drived from the batches.
         *
         * @member {PIXI.BatchDrawCall[]}
         */
        drawCalls: Array<BatchDrawCall>;
        /** Batches need to regenerated if the geometry is updated. */
        batchDirty: number;
        /**
         * Intermediate abstract format sent to batch system.
         * Can be converted to drawCalls or to batchable objects.
         *
         * @member {PIXI.graphicsUtils.BatchPart[]}
         */
        batches: Array<BatchPart>;
        /** Used to detect if the graphics object has changed. */
        protected dirty: number;
        /** Used to check if the cache is dirty. */
        protected cacheDirty: number;
        /** Used to detect if we cleared the graphicsData. */
        protected clearDirty: number;
        /** Index of the last batched shape in the stack of calls. */
        protected shapeIndex: number;
        /**
         * Cached bounds.
         *
         * @member {PIXI.Bounds}
         */
        protected _bounds: Bounds;
        /** The bounds dirty flag. */
        protected boundsDirty: number;
        constructor();
        /**
         * Get the current bounds of the graphic geometry.
         *
         * @member {PIXI.Bounds}
         * @readonly
         */
        get bounds(): Bounds;
        /**
         * Call if you changed graphicsData manually.
         * Empties all batch buffers.
         */
        protected invalidate(): void;
        /**
         * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
         *
         * @return {PIXI.GraphicsGeometry} This GraphicsGeometry object. Good for chaining method calls
         */
        clear(): GraphicsGeometry;
        /**
         * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
         *
         * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
         * @param {PIXI.FillStyle} fillStyle - Defines style of the fill.
         * @param {PIXI.LineStyle} lineStyle - Defines style of the lines.
         * @param {PIXI.Matrix} matrix - Transform applied to the points of the shape.
         * @return {PIXI.GraphicsGeometry} Returns geometry for chaining.
         */
        drawShape(shape: IShape_2, fillStyle?: FillStyle, lineStyle?: LineStyle, matrix?: Matrix): GraphicsGeometry;
        /**
         * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
         *
         * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
         * @param {PIXI.Matrix} matrix - Transform applied to the points of the shape.
         * @return {PIXI.GraphicsGeometry} Returns geometry for chaining.
         */
        drawHole(shape: IShape_2, matrix?: Matrix): GraphicsGeometry;
        /**
         * Destroys the GraphicsGeometry object.
         *
         */
        destroy(): void;
        /**
         * Check to see if a point is contained within this geometry.
         *
         * @param {PIXI.IPointData} point - Point to check if it's contained.
         * @return {Boolean} `true` if the point is contained within geometry.
         */
        containsPoint(point: IPointData): boolean;
        /**
         * Generates intermediate batch data. Either gets converted to drawCalls
         * or used to convert to batch objects directly by the Graphics object.
         *
         * @param {boolean} [allow32Indices] - Allow using 32-bit indices for preventing artifacts when more that 65535 vertices
         */
        updateBatches(allow32Indices?: boolean): void;
        /**
         * Affinity check
         *
         * @param {PIXI.FillStyle | PIXI.LineStyle} styleA
         * @param {PIXI.FillStyle | PIXI.LineStyle} styleB
         */
        protected _compareStyles(styleA: FillStyle | LineStyle, styleB: FillStyle | LineStyle): boolean;
        /**
         * Test geometry for batching process.
         *
         * @protected
         */
        protected validateBatching(): boolean;
        /**
         * Offset the indices so that it works with the batcher.
         *
         * @protected
         */
        protected packBatches(): void;
        /**
         * Checks to see if this graphics geometry can be batched.
         * Currently it needs to be small enough and not contain any native lines.
         *
         * @protected
         */
        protected isBatchable(): boolean;
        /**
         * Converts intermediate batches data to drawCalls.
         *
         * @protected
         */
        protected buildDrawCalls(): void;
        /**
         * Packs attributes to single buffer.
         *
         * @protected
         */
        protected packAttributes(): void;
        /**
         * Process fill part of Graphics.
         *
         * @param {PIXI.GraphicsData} data
         * @protected
         */
        protected processFill(data: GraphicsData): void;
        /**
         * Process line part of Graphics.
         *
         * @param {PIXI.GraphicsData} data
         * @protected
         */
        protected processLine(data: GraphicsData): void;
        /**
         * Process the holes data.
         *
         * @param {PIXI.GraphicsData[]} holes - Holes to render
         * @protected
         */
        protected processHoles(holes: Array<GraphicsData>): void;
        /**
         * Update the local bounds of the object. Expensive to use performance-wise.
         *
         * @protected
         */
        protected calculateBounds(): void;
        /**
         * Transform points using matrix.
         *
         * @protected
         * @param {number[]} points - Points to transform
         * @param {PIXI.Matrix} matrix - Transform matrix
         */
        protected transformPoints(points: Array<number>, matrix: Matrix): void;
        /**
         * Add colors.
         *
         * @protected
         * @param {number[]} colors - List of colors to add to
         * @param {number} color - Color to add
         * @param {number} alpha - Alpha to use
         * @param {number} size - Number of colors to add
         * @param {number} offset
         */
        protected addColors(colors: Array<number>, color: number, alpha: number, size: number, offset?: number): void;
        /**
         * Add texture id that the shader/fragment wants to use.
         *
         * @protected
         * @param {number[]} textureIds
         * @param {number} id
         * @param {number} size
         * @param {number} offset
         */
        protected addTextureIds(textureIds: Array<number>, id: number, size: number, offset?: number): void;
        /**
         * Generates the UVs for a shape.
         *
         * @protected
         * @param {number[]} verts - Vertices
         * @param {number[]} uvs - UVs
         * @param {PIXI.Texture} texture - Reference to Texture
         * @param {number} start - Index buffer start index.
         * @param {number} size - The size/length for index buffer.
         * @param {PIXI.Matrix} [matrix] - Optional transform for all points.
         */
        protected addUvs(verts: Array<number>, uvs: Array<number>, texture: Texture, start: number, size: number, matrix?: Matrix): void;
        /**
         * Modify uvs array according to position of texture region
         * Does not work with rotated or trimmed textures
         *
         * @param {number[]} uvs - array
         * @param {PIXI.Texture} texture - region
         * @param {number} start - starting index for uvs
         * @param {number} size - how many points to adjust
         */
        protected adjustUvs(uvs: Array<number>, texture: Texture, start: number, size: number): void;
    }

    export const graphicsUtils: {
        buildPoly: IShapeBuildCommand;
        buildCircle: IShapeBuildCommand;
        buildRectangle: IShapeBuildCommand;
        buildRoundedRectangle: IShapeBuildCommand;
        buildLine: typeof buildLine;
        ArcUtils: typeof ArcUtils;
        BezierUtils: typeof BezierUtils;
        QuadraticUtils: typeof QuadraticUtils;
        BatchPart: typeof BatchPart;
        FILL_COMMANDS: Record<SHAPES, IShapeBuildCommand>;
        BATCH_POOL: BatchPart[];
        DRAW_CALL_POOL: any[];
    };

    interface IArcLikeShape {
        cx: number;
        cy: number;
        radius: number;
        startAngle: number;
        endAngle: number;
        anticlockwise: boolean;
    }

    export interface IFillStyleOptions {
        color?: number;
        alpha?: number;
        texture?: Texture;
        matrix?: Matrix;
    }

    /**
     * Batch element computed from Graphics geometry
     */
    export interface IGraphicsBatchElement {
        vertexData: Float32Array;
        blendMode: BLEND_MODES;
        indices: Uint16Array | Uint32Array;
        uvs: Float32Array;
        alpha: number;
        worldAlpha: number;
        _batchRGB: number[];
        _tintRGB: number;
        _texture: Texture;
    }

    export interface IGraphicsCurvesSettings {
        adaptive: boolean;
        maxLength: number;
        minSegments: number;
        maxSegments: number;
        epsilon: number;
        _segmentsCount(length: number, defaultSegments?: number): number;
    }

    export interface ILineStyleOptions extends IFillStyleOptions {
        width?: number;
        alignment?: number;
        native?: boolean;
        cap?: LINE_CAP;
        join?: LINE_JOIN;
        miterLimit?: number;
    }

    type IShape_2 = Circle | Ellipse | Polygon | Rectangle | RoundedRectangle;

    interface IShapeBuildCommand {
        build(graphicsData: GraphicsData): void;
        triangulate(graphicsData: GraphicsData, target: GraphicsGeometry): void;
    }

    /**
     * Support line caps in `PIXI.LineStyle` for graphics.
     *
     * @see PIXI.Graphics#lineStyle
     *
     * @name LINE_CAP
     * @memberof PIXI
     * @static
     * @enum {string}
     * @property {string} BUTT - 'butt': don't add any cap at line ends (leaves orthogonal edges)
     * @property {string} ROUND - 'round': add semicircle at ends
     * @property {string} SQUARE - 'square': add square at end (like `BUTT` except more length at end)
     */
    export enum LINE_CAP {
        BUTT = "butt",
        ROUND = "round",
        SQUARE = "square"
    }

    /**
     * Supported line joints in `PIXI.LineStyle` for graphics.
     *
     * @see PIXI.Graphics#lineStyle
     * @see https://graphicdesign.stackexchange.com/questions/59018/what-is-a-bevel-join-of-two-lines-exactly-illustrator
     *
     * @name LINE_JOIN
     * @memberof PIXI
     * @static
     * @enum {string}
     * @property {string} MITER - 'miter': make a sharp corner where outer part of lines meet
     * @property {string} BEVEL - 'bevel': add a square butt at each end of line segment and fill the triangle at turn
     * @property {string} ROUND - 'round': add an arc at the joint
     */
    export enum LINE_JOIN {
        MITER = "miter",
        BEVEL = "bevel",
        ROUND = "round"
    }

    /**
     * Represents the line style for Graphics.
     * @memberof PIXI
     * @class
     * @extends PIXI.FillStyle
     */
    export class LineStyle extends FillStyle {
        /** The width (thickness) of any lines drawn. */
        width: number;
        /** The alignment of any lines drawn (0.5 = middle, 1 = outer, 0 = inner). WebGL only. */
        alignment: number;
        /** If true the lines will be draw using LINES instead of TRIANGLE_STRIP */
        native: boolean;
        /**
         * Line cap style.
         *
         * @member {PIXI.LINE_CAP}
         * @default PIXI.LINE_CAP.BUTT
         */
        cap: LINE_CAP;
        /**
         * Line join style.
         *
         * @member {PIXI.LINE_JOIN}
         * @default PIXI.LINE_JOIN.MITER
         */
        join: LINE_JOIN;
        /** Miter limit. */
        miterLimit: number;
        /**
         * Clones the object
         *
         * @return {PIXI.LineStyle}
         */
        clone(): LineStyle;
        /**
         * Reset the line style to default.
         */
        reset(): void;
    }

    /**
     * Utilities for quadratic curves
     * @class
     * @private
     */
    class QuadraticUtils {
        /**
         * Calculate length of quadratic curve
         * @see {@link http://www.malczak.linuxpl.com/blog/quadratic-bezier-curve-length/}
         * for the detailed explanation of math behind this.
         *
         * @private
         * @param {number} fromX - x-coordinate of curve start point
         * @param {number} fromY - y-coordinate of curve start point
         * @param {number} cpX - x-coordinate of curve control point
         * @param {number} cpY - y-coordinate of curve control point
         * @param {number} toX - x-coordinate of curve end point
         * @param {number} toY - y-coordinate of curve end point
         * @return {number} Length of quadratic curve
         */
        static curveLength(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number;
        /**
         * Calculate the points for a quadratic bezier curve and then draws it.
         * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
         *
         * @private
         * @param {number} cpX - Control point x
         * @param {number} cpY - Control point y
         * @param {number} toX - Destination point x
         * @param {number} toY - Destination point y
         * @param {number[]} points - Points to add segments to.
         */
        static curveTo(cpX: number, cpY: number, toX: number, toY: number, points: Array<number>): void;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Graphics {

        }
    }
    /////////////////////////////////////////////////
    ////////////////interaction//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    type Cursor = 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'e-resize' | 'n-resize' | 'ne-resize' | 'nw-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'w-resize' | 'ns-resize' | 'ew-resize' | 'nesw-resize' | 'col-resize' | 'nwse-resize' | 'row-resize' | 'all-scroll' | 'zoom-in' | 'zoom-out' | 'grab' | 'grabbing';

    export interface DelayedEvent {
        displayObject: DisplayObject;
        eventString: string;
        eventData: InteractionEvent;
    }

    export interface IHitArea {
        contains(x: number, y: number): boolean;
    }

    export type InteractionCallback = (interactionEvent: InteractionEvent, displayObject: DisplayObject, hit?: boolean) => void;

    /**
     * Holds all information related to an Interaction event
     *
     * @class
     * @memberof PIXI
     */
    export class InteractionData {
        global: Point;
        target: DisplayObject;
        originalEvent: InteractivePointerEvent;
        identifier: number;
        isPrimary: boolean;
        button: number;
        buttons: number;
        width: number;
        height: number;
        tiltX: number;
        tiltY: number;
        pointerType: string;
        pressure: number;
        rotationAngle: number;
        twist: number;
        tangentialPressure: number;
        constructor();
        /**
         * The unique identifier of the pointer. It will be the same as `identifier`.
         * @readonly
         * @member {number}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId
         */
        get pointerId(): number;
        /**
         * This will return the local coordinates of the specified displayObject for this InteractionData
         *
         * @param {PIXI.DisplayObject} displayObject - The DisplayObject that you would like the local
         *  coords off
         * @param {PIXI.Point} [point] - A Point object in which to store the value, optional (otherwise
         *  will create a new point)
         * @param {PIXI.Point} [globalPos] - A Point object containing your custom global coords, optional
         *  (otherwise will use the current global coords)
         * @return {PIXI.Point} A point containing the coordinates of the InteractionData position relative
         *  to the DisplayObject
         */
        getLocalPosition<P extends IPointData = Point>(displayObject: DisplayObject, point?: P, globalPos?: IPointData): P;
        /**
         * Copies properties from normalized event data.
         *
         * @param {Touch|MouseEvent|PointerEvent} event - The normalized event data
         */
        copyEvent(event: Touch | InteractivePointerEvent): void;
        /**
         * Resets the data for pooling.
         */
        reset(): void;
    }

    /**
     * Event class that mimics native DOM events.
     *
     * @class
     * @memberof PIXI
     */
    export class InteractionEvent {
        stopped: boolean;
        stopsPropagatingAt: DisplayObject;
        stopPropagationHint: boolean;
        target: DisplayObject;
        currentTarget: DisplayObject;
        type: string;
        data: InteractionData;
        constructor();
        /**
         * Prevents event from reaching any objects other than the current object.
         *
         */
        stopPropagation(): void;
        /**
         * Resets the event.
         */
        reset(): void;
    }

    /**
     * The interaction manager deals with mouse, touch and pointer events.
     *
     * Any DisplayObject can be interactive if its `interactive` property is set to true.
     *
     * This manager also supports multitouch.
     *
     * An instance of this class is automatically created by default, and can be found at `renderer.plugins.interaction`
     *
     * @class
     * @extends PIXI.utils.EventEmitter
     * @memberof PIXI
     */
    export class InteractionManager extends PIXI.utils.EventEmitter {
        readonly activeInteractionData: {
            [key: number]: InteractionData;
        };
        readonly supportsTouchEvents: boolean;
        readonly supportsPointerEvents: boolean;
        interactionDataPool: InteractionData[];
        cursor: string;
        delayedEvents: DelayedEvent[];
        search: TreeSearch;
        renderer: AbstractRenderer;
        autoPreventDefault: boolean;
        interactionFrequency: number;
        mouse: InteractionData;
        eventData: InteractionEvent;
        moveWhenInside: boolean;
        cursorStyles: any;
        currentCursorMode: string;
        resolution: number;
        protected interactionDOMElement: HTMLElement;
        protected eventsAdded: boolean;
        protected tickerAdded: boolean;
        protected mouseOverRenderer: boolean;
        private _useSystemTicker;
        private _deltaTime;
        private _didMove;
        private _tempDisplayObject;
        private readonly _eventListenerOptions;
        /**
         * @param {PIXI.CanvasRenderer|PIXI.Renderer} renderer - A reference to the current renderer
         * @param {object} [options] - The options for the manager.
         * @param {boolean} [options.autoPreventDefault=true] - Should the manager automatically prevent default browser actions.
         * @param {number} [options.interactionFrequency=10] - Maximum frequency (ms) at pointer over/out states will be checked.
         * @param {number} [options.useSystemTicker=true] - Whether to add {@link tickerUpdate} to {@link PIXI.Ticker.system}.
         */
        constructor(renderer: AbstractRenderer, options?: InteractionManagerOptions);
        /**
         * Should the InteractionManager automatically add {@link tickerUpdate} to {@link PIXI.Ticker.system}.
         *
         * @member {boolean}
         * @default true
         */
        get useSystemTicker(): boolean;
        set useSystemTicker(useSystemTicker: boolean);
        /**
         * Last rendered object or temp object
         * @readonly
         * @protected
         * @member {PIXI.DisplayObject}
         */
        get lastObjectRendered(): DisplayObject;
        /**
         * Hit tests a point against the display tree, returning the first interactive object that is hit.
         *
         * @param {PIXI.Point} globalPoint - A point to hit test with, in global space.
         * @param {PIXI.Container} [root] - The root display object to start from. If omitted, defaults
         * to the last rendered root of the associated renderer.
         * @return {PIXI.DisplayObject} The hit display object, if any.
         */
        hitTest(globalPoint: Point, root?: DisplayObject): DisplayObject;
        /**
         * Sets the DOM element which will receive mouse/touch events. This is useful for when you have
         * other DOM elements on top of the renderers Canvas element. With this you'll be bale to delegate
         * another DOM element to receive those events.
         *
         * @param {HTMLElement} element - the DOM element which will receive mouse and touch events.
         * @param {number} [resolution=1] - The resolution / device pixel ratio of the new element (relative to the canvas).
         */
        setTargetElement(element: HTMLElement, resolution?: number): void;
        /**
         * Add the ticker listener
         *
         * @private
         */
        private addTickerListener;
        /**
         * Remove the ticker listener
         *
         * @private
         */
        private removeTickerListener;
        /**
         * Registers all the DOM events
         *
         * @private
         */
        private addEvents;
        /**
         * Removes all the DOM events that were previously registered
         *
         * @private
         */
        private removeEvents;
        /**
         * Updates the state of interactive objects if at least {@link interactionFrequency}
         * milliseconds have passed since the last invocation.
         *
         * Invoked by a throttled ticker update from {@link PIXI.Ticker.system}.
         *
         * @param {number} deltaTime - time delta since the last call
         */
        tickerUpdate(deltaTime: number): void;
        /**
         * Updates the state of interactive objects.
         */
        update(): void;
        /**
         * Sets the current cursor mode, handling any callbacks or CSS style changes.
         *
         * @param {string} mode - cursor mode, a key from the cursorStyles dictionary
         */
        setCursorMode(mode: string): void;
        /**
         * Dispatches an event on the display object that was interacted with
         *
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - the display object in question
         * @param {string} eventString - the name of the event (e.g, mousedown)
         * @param {PIXI.InteractionEvent} eventData - the event data object
         * @private
         */
        private dispatchEvent;
        /**
         * Puts a event on a queue to be dispatched later. This is used to guarantee correct
         * ordering of over/out events.
         *
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - the display object in question
         * @param {string} eventString - the name of the event (e.g, mousedown)
         * @param {object} eventData - the event data object
         * @private
         */
        private delayDispatchEvent;
        /**
         * Maps x and y coords from a DOM object and maps them correctly to the PixiJS view. The
         * resulting value is stored in the point. This takes into account the fact that the DOM
         * element could be scaled and positioned anywhere on the screen.
         *
         * @param  {PIXI.IPointData} point - the point that the result will be stored in
         * @param  {number} x - the x coord of the position to map
         * @param  {number} y - the y coord of the position to map
         */
        mapPositionToPoint(point: IPointData, x: number, y: number): void;
        /**
         * This function is provides a neat way of crawling through the scene graph and running a
         * specified function on all interactive objects it finds. It will also take care of hit
         * testing the interactive objects and passes the hit across in the function.
         *
         * @protected
         * @param {PIXI.InteractionEvent} interactionEvent - event containing the point that
         *  is tested for collision
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - the displayObject
         *  that will be hit test (recursively crawls its children)
         * @param {Function} [func] - the function that will be called on each interactive object. The
         *  interactionEvent, displayObject and hit will be passed to the function
         * @param {boolean} [hitTest] - indicates whether we want to calculate hits
         *  or just iterate through all interactive objects
         */
        processInteractive(interactionEvent: InteractionEvent, displayObject: DisplayObject, func?: InteractionCallback, hitTest?: boolean): void;
        /**
         * Is called when the pointer button is pressed down on the renderer element
         *
         * @private
         * @param {PointerEvent} originalEvent - The DOM event of a pointer button being pressed down
         */
        private onPointerDown;
        /**
         * Processes the result of the pointer down check and dispatches the event if need be
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - The display object that was tested
         * @param {boolean} hit - the result of the hit test on the display object
         */
        private processPointerDown;
        /**
         * Is called when the pointer button is released on the renderer element
         *
         * @private
         * @param {PointerEvent} originalEvent - The DOM event of a pointer button being released
         * @param {boolean} cancelled - true if the pointer is cancelled
         * @param {Function} func - Function passed to {@link processInteractive}
         */
        private onPointerComplete;
        /**
         * Is called when the pointer button is cancelled
         *
         * @private
         * @param {PointerEvent} event - The DOM event of a pointer button being released
         */
        private onPointerCancel;
        /**
         * Processes the result of the pointer cancel check and dispatches the event if need be
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - The display object that was tested
         */
        private processPointerCancel;
        /**
         * Is called when the pointer button is released on the renderer element
         *
         * @private
         * @param {PointerEvent} event - The DOM event of a pointer button being released
         */
        private onPointerUp;
        /**
         * Processes the result of the pointer up check and dispatches the event if need be
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - The display object that was tested
         * @param {boolean} hit - the result of the hit test on the display object
         */
        private processPointerUp;
        /**
         * Is called when the pointer moves across the renderer element
         *
         * @private
         * @param {PointerEvent} originalEvent - The DOM event of a pointer moving
         */
        private onPointerMove;
        /**
         * Processes the result of the pointer move check and dispatches the event if need be
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - The display object that was tested
         * @param {boolean} hit - the result of the hit test on the display object
         */
        private processPointerMove;
        /**
         * Is called when the pointer is moved out of the renderer element
         *
         * @private
         * @param {PointerEvent} originalEvent - The DOM event of a pointer being moved out
         */
        private onPointerOut;
        /**
         * Processes the result of the pointer over/out check and dispatches the event if need be
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - The display object that was tested
         * @param {boolean} hit - the result of the hit test on the display object
         */
        private processPointerOverOut;
        /**
         * Is called when the pointer is moved into the renderer element
         *
         * @private
         * @param {PointerEvent} originalEvent - The DOM event of a pointer button being moved into the renderer view
         */
        private onPointerOver;
        /**
         * Get InteractionData for a given pointerId. Store that data as well
         *
         * @private
         * @param {PointerEvent} event - Normalized pointer event, output from normalizeToPointerData
         * @return {PIXI.InteractionData} - Interaction data for the given pointer identifier
         */
        private getInteractionDataForPointerId;
        /**
         * Return unused InteractionData to the pool, for a given pointerId
         *
         * @private
         * @param {number} pointerId - Identifier from a pointer event
         */
        private releaseInteractionDataForPointerId;
        /**
         * Configure an InteractionEvent to wrap a DOM PointerEvent and InteractionData
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - The event to be configured
         * @param {PointerEvent} pointerEvent - The DOM event that will be paired with the InteractionEvent
         * @param {PIXI.InteractionData} interactionData - The InteractionData that will be paired
         *        with the InteractionEvent
         * @return {PIXI.InteractionEvent} the interaction event that was passed in
         */
        private configureInteractionEventForDOMEvent;
        /**
         * Ensures that the original event object contains all data that a regular pointer event would have
         *
         * @private
         * @param {TouchEvent|MouseEvent|PointerEvent} event - The original event data from a touch or mouse event
         * @return {PointerEvent[]} An array containing a single normalized pointer event, in the case of a pointer
         *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
         */
        private normalizeToPointerData;
        /**
         * Destroys the interaction manager
         *
         */
        destroy(): void;
    }

    export interface InteractionManagerOptions {
        autoPreventDefault?: boolean;
        interactionFrequency?: number;
        useSystemTicker?: boolean;
    }

    /**
     * DisplayObjects with the {@link PIXI.interactiveTarget} mixin use this class to track interactions
     *
     * @class
     * @private
     * @memberof PIXI
     */
    export class InteractionTrackingData {
        static FLAGS: Readonly<InteractionTrackingFlags>;
        private readonly _pointerId;
        private _flags;
        /**
         * @param {number} pointerId - Unique pointer id of the event
         * @private
         */
        constructor(pointerId: number);
        /**
         *
         * @private
         * @param {number} flag - The interaction flag to set
         * @param {boolean} yn - Should the flag be set or unset
         */
        private _doSet;
        /**
         * Unique pointer id of the event
         *
         * @readonly
         * @private
         * @member {number}
         */
        get pointerId(): number;
        /**
         * State of the tracking data, expressed as bit flags
         *
         * @private
         * @member {number}
         */
        get flags(): number;
        set flags(flags: number);
        /**
         * Is the tracked event inactive (not over or down)?
         *
         * @private
         * @member {number}
         */
        get none(): boolean;
        /**
         * Is the tracked event over the DisplayObject?
         *
         * @private
         * @member {boolean}
         */
        get over(): boolean;
        set over(yn: boolean);
        /**
         * Did the right mouse button come down in the DisplayObject?
         *
         * @private
         * @member {boolean}
         */
        get rightDown(): boolean;
        set rightDown(yn: boolean);
        /**
         * Did the left mouse button come down in the DisplayObject?
         *
         * @private
         * @member {boolean}
         */
        get leftDown(): boolean;
        set leftDown(yn: boolean);
    }

    export interface InteractionTrackingFlags {
        OVER: number;
        LEFT_DOWN: number;
        RIGHT_DOWN: number;
        NONE: number;
    }

    export type InteractivePointerEvent = PointerEvent | TouchEvent | MouseEvent;

    export class InteractiveTarget extends PIXI.utils.EventEmitter{
        interactive: boolean;
        interactiveChildren: boolean;
        hitArea: IHitArea;
        cursor: Cursor | string;
        buttonMode: boolean;
        trackedPointers: {
            [x: number]: InteractionTrackingData;
        };
        _trackedPointers: {
            [x: number]: InteractionTrackingData;
        };
    }

    /**
     * Default property values of interactive objects
     * Used by {@link PIXI.InteractionManager} to automatically give all DisplayObjects these properties
     *
     * @private
     * @name interactiveTarget
     * @type {Object}
     * @memberof PIXI
     * @example
     *      function MyObject() {}
     *
     *      Object.assign(
     *          DisplayObject.prototype,
     *          PIXI.interactiveTarget
     *      );
     */
    export const interactiveTarget: InteractiveTarget;

    /**
     * Strategy how to search through stage tree for interactive objects
     *
     * @private
     * @class
     * @memberof PIXI
     */
    class TreeSearch {
        private readonly _tempPoint;
        constructor();
        /**
         * Recursive implementation for findHit
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - event containing the point that
         *  is tested for collision
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - the displayObject
         *  that will be hit test (recursively crawls its children)
         * @param {Function} [func] - the function that will be called on each interactive object. The
         *  interactionEvent, displayObject and hit will be passed to the function
         * @param {boolean} [hitTest] - this indicates if the objects inside should be hit test against the point
         * @param {boolean} [interactive] - Whether the displayObject is interactive
         * @return {boolean} returns true if the displayObject hit the point
         */
        recursiveFindHit(interactionEvent: InteractionEvent, displayObject: DisplayObject, func?: InteractionCallback, hitTest?: boolean, interactive?: boolean): boolean;
        /**
         * This function is provides a neat way of crawling through the scene graph and running a
         * specified function on all interactive objects it finds. It will also take care of hit
         * testing the interactive objects and passes the hit across in the function.
         *
         * @private
         * @param {PIXI.InteractionEvent} interactionEvent - event containing the point that
         *  is tested for collision
         * @param {PIXI.Container|PIXI.Sprite|PIXI.TilingSprite} displayObject - the displayObject
         *  that will be hit test (recursively crawls its children)
         * @param {Function} [func] - the function that will be called on each interactive object. The
         *  interactionEvent, displayObject and hit will be passed to the function
         * @param {boolean} [hitTest] - this indicates if the objects inside should be hit test against the point
         * @return {boolean} returns true if the displayObject hit the point
         */
        findHit(interactionEvent: InteractionEvent, displayObject: DisplayObject, func?: InteractionCallback, hitTest?: boolean): void;
    }


    /////////////////////////////////////////////////
    ////////////////loaders//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * Application plugin for supporting loader option. Installing the LoaderPlugin
     * is not necessary if using **pixi.js** or **pixi.js-legacy**.
     * @example
     * Application.registerPlugin(AppLoaderPlugin);
     * @memberof PIXI
     */
    export class AppLoaderPlugin {
        /**
         * Loader instance to help with asset loading.
         * @memberof PIXI.Application#
         * @readonly
         */
        static loader: Loader;
        /**
         * Called on application constructor
         *
         * @private
         */
        static init(options?: GlobalMixins.IApplicationOptions): void;
        /**
         * Called when application destroyed
         *
         * @private
         */
        static destroy(): void;
    }

    /**
     * Options for a call to `.add()`.
     *
     * @see Loader#add
     *
     * @property name - The name of the resource to load, if not passed the url is used.
     * @property key - Alias for `name`.
     * @property url - The url for this resource, relative to the baseUrl of this loader.
     * @property crossOrigin - Is this request cross-origin? Default is to determine automatically.
     * @property timeout=0 - A timeout in milliseconds for the load. If the load takes longer
     *      than this time it is cancelled and the load is considered a failure. If this value is
     *      set to `0` then there is no explicit timeout.
     * @property loadType=LoaderResource.LOAD_TYPE.XHR - How should this resource be loaded?
     * @property xhrType=LoaderResource.XHR_RESPONSE_TYPE.DEFAULT - How should the data being
     *      loaded be interpreted when using XHR?
     * @property onComplete - Callback to add an an onComplete signal istener.
     * @property callback - Alias for `onComplete`.
     * @property metadata - Extra configuration for middleware and the Resource object.
     */
    export interface IAddOptions {
        name?: string;
        key?: string;
        url?: string;
        crossOrigin?: string | boolean;
        timeout?: number;
        parentResource?: LoaderResource;
        loadType?: LoaderResource.LOAD_TYPE;
        xhrType?: LoaderResource.XHR_RESPONSE_TYPE;
        onComplete?: LoaderResource.OnCompleteSignal;
        callback?: LoaderResource.OnCompleteSignal;
        metadata?: IResourceMetadata;
    }

    export interface ILoaderAdd {
        (name: string, url: string, callback?: LoaderResource.OnCompleteSignal): Loader;
        (name: string, url: string, options?: IAddOptions, callback?: LoaderResource.OnCompleteSignal): Loader;
        (url: string, callback?: LoaderResource.OnCompleteSignal): Loader;
        (url: string, options?: IAddOptions, callback?: LoaderResource.OnCompleteSignal): Loader;
        (options: IAddOptions, callback?: LoaderResource.OnCompleteSignal): Loader;
        (resources: (IAddOptions | string)[], callback?: LoaderResource.OnCompleteSignal): Loader;
    }

    export type ILoaderMiddleware = (resource: LoaderResource, next: (...args: any[]) => void) => void;

    /**
     * Plugin to be installed for handling specific Loader resources.
     *
     * @property add - Function to call immediate after registering plugin.
     * @property pre - Middleware function to run before load, the
     *           arguments for this are `(resource, next)`
     * @property use - Middleware function to run after load, the
     *           arguments for this are `(resource, next)`
     */
    export interface ILoaderPlugin {
        /**
         * Function to call immediate after registering plugin.
         */
        add?(): void;
        /**
         * Middleware function to run before load
         * @param resource - resource
         * @param next - next middleware
         */
        pre?(resource: LoaderResource, next: (...args: any[]) => void): void;
        /**
         * Middleware function to run after load
         * @param resource - resource
         * @param next - next middleware
         */
        use?(resource: LoaderResource, next: (...args: any[]) => void): void;
    }

    /** @deprecated - Use LoaderResource instead */
    export type ILoaderResource = LoaderResource;

    /**
     * Metadata for loader resource. It is very messy way to pass options for loader middlewares
     *
     * Can be extended in `GlobalMixins.IResourceMetadata`
     *
     * @memberof PIXI
     */
    export interface IResourceMetadata extends GlobalMixins.IResourceMetadata, IBaseTextureOptions {
        /**
         * The element to use for loading, instead of creating one.
         */
        loadElement?: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
        /**
         * Skips adding source(s) to the load element. This
         * is useful if you want to pass in a `loadElement` that you already added load sources to.
         */
        skipSource?: boolean;
        /**
         * The mime type to use for the source element
         * of a video/audio elment. If the urls are an array, you can pass this as an array as well
         * where each index is the mime type to use for the corresponding url index.
         */
        mimeType?: string | string[];
        /**
         * Used by BitmapFonts, Spritesheet and CompressedTextures as the options to used for
         * metadata when loading the child image.
         */
        imageMetadata?: IResourceMetadata;
    }

    /**
     * The new loader, forked from Resource Loader by Chad Engler: https://github.com/englercj/resource-loader
     *
     * ```js
     * const loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
     * // or
     * const loader = new PIXI.Loader(); // You can also create your own if you want
     *
     * const sprites = {};
     *
     * // Chainable `add` to enqueue a resource
     * loader.add('bunny', 'data/bunny.png')
     *       .add('spaceship', 'assets/spritesheet.json');
     * loader.add('scoreFont', 'assets/score.fnt');
     *
     * // Chainable `pre` to add a middleware that runs for each resource, *before* loading that resource.
     * // This is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
     * loader.pre(cachingMiddleware);
     *
     * // Chainable `use` to add a middleware that runs for each resource, *after* loading that resource.
     * // This is useful to implement custom parsing modules (like spritesheet parsers, spine parser, etc).
     * loader.use(parsingMiddleware);
     *
     * // The `load` method loads the queue of resources, and calls the passed in callback called once all
     * // resources have loaded.
     * loader.load((loader, resources) => {
     *     // resources is an object where the key is the name of the resource loaded and the value is the resource object.
     *     // They have a couple default properties:
     *     // - `url`: The URL that the resource was loaded from
     *     // - `error`: The error that happened when trying to load (if any)
     *     // - `data`: The raw data that was loaded
     *     // also may contain other properties based on the middleware that runs.
     *     sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
     *     sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
     *     sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);
     * });
     *
     * // throughout the process multiple signals can be dispatched.
     * loader.onProgress.add(() => {}); // called once per loaded/errored file
     * loader.onError.add(() => {}); // called once per errored file
     * loader.onLoad.add(() => {}); // called once per loaded file
     * loader.onComplete.add(() => {}); // called once when the queued resources all load.
     * ```
     *
     * @memberof PIXI
     */
    export class Loader {
        /**
         * The base url for all resources loaded by this loader.
         */
        baseUrl: string;
        /**
         * The progress percent of the loader going through the queue.
         */
        progress: number;
        /**
         * Loading state of the loader, true if it is currently loading resources.
         */
        loading: boolean;
        /**
         * A querystring to append to every URL added to the loader.
         *
         * This should be a valid query string *without* the question-mark (`?`). The loader will
         * also *not* escape values for you. Make sure to escape your parameters with
         * [`encodeURIComponent`](https://mdn.io/encodeURIComponent) before assigning this property.
         *
         * @example
         * const loader = new Loader();
         *
         * loader.defaultQueryString = 'user=me&password=secret';
         *
         * // This will request 'image.png?user=me&password=secret'
         * loader.add('image.png').load();
         *
         * loader.reset();
         *
         * // This will request 'image.png?v=1&user=me&password=secret'
         * loader.add('iamge.png?v=1').load();
         */
        defaultQueryString: string;
        /**
         * The middleware to run before loading each resource.
         */
        private _beforeMiddleware;
        /**
         * The middleware to run after loading each resource.
         */
        private _afterMiddleware;
        /**
         * The tracks the resources we are currently completing parsing for.
         */
        private _resourcesParsing;
        /**
         * The `_loadResource` function bound with this object context.
         *
         * @param r - The resource to load
         * @param d - The dequeue function
         */
        private _boundLoadResource;
        /**
         * The resources waiting to be loaded.
         */
        private _queue;
        /**
         * All the resources for this loader keyed by name.
         */
        resources: any;
        /**
         * Dispatched once per loaded or errored resource.
         */
        onProgress: Signal<Loader.OnProgressSignal>;
        /**
         * Dispatched once per errored resource.
         */
        onError: Signal<Loader.OnErrorSignal>;
        /**
         * Dispatched once per loaded resource.
         */
        onLoad: Signal<Loader.OnLoadSignal>;
        /**
         * Dispatched when the loader begins to process the queue.
         */
        onStart: Signal<Loader.OnStartSignal>;
        /**
         * Dispatched when the queued resources all load.
         */
        onComplete: Signal<Loader.OnCompleteSignal>;
        /**
         * @param baseUrl - The base url for all resources loaded by this loader.
         * @param concurrency - The number of resources to load concurrently.
         */
        constructor(baseUrl?: string, concurrency?: number);
        /**
         * Adds a resource (or multiple resources) to the loader queue.
         *
         * This function can take a wide variety of different parameters. The only thing that is always
         * required the url to load. All the following will work:
         *
         * ```js
         * loader
         *     // normal param syntax
         *     .add('key', 'http://...', function () {})
         *     .add('http://...', function () {})
         *     .add('http://...')
         *
         *     // object syntax
         *     .add({
         *         name: 'key2',
         *         url: 'http://...'
         *     }, function () {})
         *     .add({
         *         url: 'http://...'
         *     }, function () {})
         *     .add({
         *         name: 'key3',
         *         url: 'http://...'
         *         onComplete: function () {}
         *     })
         *     .add({
         *         url: 'https://...',
         *         onComplete: function () {},
         *         crossOrigin: true
         *     })
         *
         *     // you can also pass an array of objects or urls or both
         *     .add([
         *         { name: 'key4', url: 'http://...', onComplete: function () {} },
         *         { url: 'http://...', onComplete: function () {} },
         *         'http://...'
         *     ])
         *
         *     // and you can use both params and options
         *     .add('key', 'http://...', { crossOrigin: true }, function () {})
         *     .add('http://...', { crossOrigin: true }, function () {});
         * ```
         */
        add: ILoaderAdd;
        /**
         * Same as add, params have strict order
         *
         * @private
         * @param name - The name of the resource to load.
         * @param url - The url for this resource, relative to the baseUrl of this loader.
         * @param options - The options for the load.
         * @param callback - Function to call when this specific resource completes loading.
         * @return The loader itself.
         */
        protected _add(name: string, url: string, options: IAddOptions, callback?: LoaderResource.OnCompleteSignal): this;
        /**
         * Sets up a middleware function that will run *before* the
         * resource is loaded.
         *
         * @param fn - The middleware function to register.
         * @return The loader itself.
         */
        pre(fn: ILoaderMiddleware): this;
        /**
         * Sets up a middleware function that will run *after* the
         * resource is loaded.
         *
         * @param fn - The middleware function to register.
         * @return The loader itself.
         */
        use(fn: ILoaderMiddleware): this;
        /**
         * Resets the queue of the loader to prepare for a new load.
         *
         * @return The loader itself.
         */
        reset(): this;
        /**
         * Starts loading the queued resources.
         * @param cb - Optional callback that will be bound to the `complete` event.
         * @return The loader itself.
         */
        load(cb?: Loader.OnCompleteSignal): this;
        /**
         * The number of resources to load concurrently.
         *
         * @default 10
         */
        get concurrency(): number;
        set concurrency(concurrency: number);
        /**
         * Prepares a url for usage based on the configuration of this object
         * @param url - The url to prepare.
         * @return The prepared url.
         */
        private _prepareUrl;
        /**
         * Loads a single resource.
         *
         * @param resource - The resource to load.
         * @param dequeue - The function to call when we need to dequeue this item.
         */
        private _loadResource;
        /**
         * Called once loading has started.
         */
        private _onStart;
        /**
         * Called once each resource has loaded.
         */
        protected _onComplete();
        /**
         * Called each time a resources is loaded.
         * @param resource - The resource that was loaded
         */
        private _onLoad;
        private static _plugins;
        private static _shared;
        /**
         * If this loader cannot be destroyed.
         * @default false
         */
        private _protected;
        /**
         * Destroy the loader, removes references.
         */
        destroy(): void;
        /**
         * A premade instance of the loader that can be used to load resources.
         */
        static get shared(): Loader;
        /**
         * Adds a Loader plugin for the global shared loader and all
         * new Loader instances created.
         *
         * @param plugin - The plugin to add
         * @return Reference to PIXI.Loader for chaining
         */
        static registerPlugin(plugin: ILoaderPlugin): typeof Loader;
    }

    export namespace Loader {
        /**
         * When the resource starts to load.
         * @param resource - The resource that the event happened on.
         */
        export type OnStartSignal = (loader: Loader) => void;
        /**
         * When the progress changes the loader and resource are dispatched.
         * @param loader - The loader the progress is advancing on.
         * @param resource - The resource that has completed or failed to cause the progress to advance.
         */
        export type OnProgressSignal = (loader: Loader, resource: LoaderResource) => void;
        /**
         * When a load completes without error the loader and resource are dispatched.
         * @param loader - The loader that has started loading resources.
         * @param resource - The resource that has completed.
         */
        export type OnLoadSignal = (loader: Loader, resource: LoaderResource) => void;
        /**
         * When the loader starts loading resources it dispatches this callback.
         * @param loader - The loader that has started loading resources.
         */
        export type OnCompleteSignal = (loader: Loader, resources: any) => void;
        /**
         * When an error occurs the loader and resource are dispatched.
         * @param loader - The loader the error happened in.
         * @param resource - The resource that caused the error.
         */
        export type OnErrorSignal = (error: Error, loader: Loader, resource: LoaderResource) => void;
    }

  
    /**
     * Manages the state and loading of a resource and all child resources.
     *
     * Can be extended in `GlobalMixins.LoaderResource`.
     *
     * @memberof PIXI
     */
    export class LoaderResource extends GlobalMixins.LoaderResource{
        /**
         * Texture reference for loading images and other textures.
         * @type {PIXI.Texture}
         */
        texture?: Texture;
        /**
         * used by parsing middleware
         */
        blob?: Blob;
        /**
         * The name of this resource.
         *
         * @readonly
         * @type {string}
         */
        readonly name: string;
        /**
         * The url used to load this resource.
         *
         * @readonly
         * @type {string}
         */
        readonly url: string;
        /**
         * The extension used to load this resource.
         *
         * @readonly
         * @type {string}
         */
        readonly extension: string;
        /**
         * The data that was loaded by the resource.
         */
        data: any;
        /**
         * Is this request cross-origin? If unset, determined automatically.
         */
        crossOrigin: string | boolean;
        /**
         * A timeout in milliseconds for the load. If the load takes longer than this time
         * it is cancelled and the load is considered a failure. If this value is set to `0`
         * then there is no explicit timeout.
         *
         * @type {number}
         */
        timeout: number;
        /**
         * The method of loading to use for this resource.
         *
         * @type {PIXI.LoaderResource.LOAD_TYPE}
         */
        loadType: LoaderResource.LOAD_TYPE;
        /**
         * The type used to load the resource via XHR. If unset, determined automatically.
         *
         * @member {string}
         */
        xhrType: string;
        /**
         * Extra info for middleware, and controlling specifics about how the resource loads.
         *
         * Note that if you pass in a `loadElement`, the Resource class takes ownership of it.
         * Meaning it will modify it as it sees fit.
         *
         * @type {PIXI.IResourceMetadata}
         */
        metadata: IResourceMetadata;
        /**
         * The error that occurred while loading (if any).
         *
         * @readonly
         * @member {Error}
         */
        error: Error;
        /**
         * The XHR object that was used to load this resource. This is only set
         * when `loadType` is `LoaderResource.LOAD_TYPE.XHR`.
         *
         * @readonly
         */
        xhr: XMLHttpRequest;
        private xdr;
        /**
         * The child resources this resource owns.
         *
         * @type {PIXI.LoaderResource[]}
         */
        readonly children: LoaderResource[];
        /**
         * The resource type.
         *
         * @readonly
         * @type {PIXI.LoaderResource.TYPE}
         */
        type: LoaderResource.TYPE;
        /**
         * The progress chunk owned by this resource.
         *
         * @readonly
         * @member {number}
         */
        progressChunk: number;
        /**
         * Dispatched when the resource beings to load.
         *
         * The callback looks like {@link LoaderResource.OnStartSignal}.
         *
         * @type {PIXI.Signal}
         */
        onStart: Signal<LoaderResource.OnStartSignal>;
        /**
         * Dispatched each time progress of this resource load updates.
         * Not all resources types and loader systems can support this event
         * so sometimes it may not be available. If the resource
         * is being loaded on a modern browser, using XHR, and the remote server
         * properly sets Content-Length headers, then this will be available.
         *
         * The callback looks like {@link LoaderResource.OnProgressSignal}.
         *
         * @type {PIXI.Signal}
         */
        onProgress: Signal<LoaderResource.OnProgressSignal>;
        /**
         * Dispatched once this resource has loaded, if there was an error it will
         * be in the `error` property.
         *
         * The callback looks like {@link LoaderResource.OnCompleteSignal}.
         *
         * @type {PIXI.Signal}
         */
        onComplete: Signal<LoaderResource.OnCompleteSignal>;
        /**
         * Dispatched after this resource has had all the *after* middleware run on it.
         *
         * The callback looks like {@link LoaderResource.OnCompleteSignal}.
         *
         * @type {PIXI.Signal}
         */
        onAfterMiddleware: Signal<LoaderResource.OnCompleteSignal>;
        /**
         * The state flags of this resource.
         *
         * @private
         * @member {number}
         */
        private _flags;
        /**
         * The `dequeue` method that will be used a storage place for the async queue dequeue method
         * used privately by the loader.
         *
         * @private
         * @member {function}
         */
        _dequeue: any;
        /**
         * Used a storage place for the on load binding used privately by the loader.
         *
         * @private
         * @member {function}
         */
        _onLoadBinding: any;
        /**
         * The timer for element loads to check if they timeout.
         *
         * @private
         */
        private _elementTimer;
        /**
         * The `complete` function bound to this resource's context.
         *
         * @private
         * @type {function}
         */
        private _boundComplete;
        /**
         * The `_onError` function bound to this resource's context.
         *
         * @private
         * @type {function}
         */
        private _boundOnError;
        /**
         * The `_onProgress` function bound to this resource's context.
         *
         * @private
         * @type {function}
         */
        private _boundOnProgress;
        /**
         * The `_onTimeout` function bound to this resource's context.
         *
         * @private
         * @type {function}
         */
        private _boundOnTimeout;
        private _boundXhrOnError;
        private _boundXhrOnTimeout;
        private _boundXhrOnAbort;
        private _boundXhrOnLoad;
        /**
         * Sets the load type to be used for a specific extension.
         *
         * @static
         * @param {string} extname - The extension to set the type for, e.g. "png" or "fnt"
         * @param {PIXI.LoaderResource.LOAD_TYPE} loadType - The load type to set it to.
         */
        static setExtensionLoadType(extname: string, loadType: LoaderResource.LOAD_TYPE): void;
        /**
         * Sets the load type to be used for a specific extension.
         *
         * @static
         * @param {string} extname - The extension to set the type for, e.g. "png" or "fnt"
         * @param {PIXI.LoaderResource.XHR_RESPONSE_TYPE} xhrType - The xhr type to set it to.
         */
        static setExtensionXhrType(extname: string, xhrType: LoaderResource.XHR_RESPONSE_TYPE): void;
        /**
         * @param {string} name - The name of the resource to load.
         * @param {string|string[]} url - The url for this resource, for audio/video loads you can pass
         *      an array of sources.
         * @param {object} [options] - The options for the load.
         * @param {string|boolean} [options.crossOrigin] - Is this request cross-origin? Default is to
         *      determine automatically.
         * @param {number} [options.timeout=0] - A timeout in milliseconds for the load. If the load takes
         *      longer than this time it is cancelled and the load is considered a failure. If this value is
         *      set to `0` then there is no explicit timeout.
         * @param {PIXI.LoaderResource.LOAD_TYPE} [options.loadType=LOAD_TYPE.XHR] - How should this resource
         *      be loaded?
         * @param {PIXI.LoaderResource.XHR_RESPONSE_TYPE} [options.xhrType=XHR_RESPONSE_TYPE.DEFAULT] - How
         *      should the data being loaded be interpreted when using XHR?
         * @param {PIXI.LoaderResource.IMetadata} [options.metadata] - Extra configuration for middleware
         *      and the Resource object.
         */
        constructor(name: string, url: string | string[], options?: {
            crossOrigin?: string | boolean;
            timeout?: number;
            loadType?: LoaderResource.LOAD_TYPE;
            xhrType?: LoaderResource.XHR_RESPONSE_TYPE;
            metadata?: IResourceMetadata;
        });
        /**
         * When the resource starts to load.
         *
         * @memberof PIXI.LoaderResource
         * @callback OnStartSignal@callback OnStartSignal
         * @param {Resource} resource - The resource that the event happened on.
         */
        /**
         * When the resource reports loading progress.
         *
         * @memberof PIXI.LoaderResource
         * @callback OnProgressSignal@callback OnProgressSignal
         * @param {Resource} resource - The resource that the event happened on.
         * @param {number} percentage - The progress of the load in the range [0, 1].
         */
        /**
         * When the resource finishes loading.
         *
         * @memberof PIXI.LoaderResource
         * @callback OnCompleteSignal@callback OnCompleteSignal
         * @param {Resource} resource - The resource that the event happened on.
         */
        /**
         * @memberof PIXI.LoaderResource
         * @typedef {object} IMetadata@typedef {object} IMetadata
         * @property {HTMLImageElement|HTMLAudioElement|HTMLVideoElement} [loadElement=null] - The
         *      element to use for loading, instead of creating one.
         * @property {boolean} [skipSource=false] - Skips adding source(s) to the load element. This
         *      is useful if you want to pass in a `loadElement` that you already added load sources to.
         * @property {string|string[]} [mimeType] - The mime type to use for the source element
         *      of a video/audio elment. If the urls are an array, you can pass this as an array as well
         *      where each index is the mime type to use for the corresponding url index.
         */
        /**
         * Stores whether or not this url is a data url.
         *
         * @readonly
         * @member {boolean}
         */
        get isDataUrl(): boolean;
        /**
         * Describes if this resource has finished loading. Is true when the resource has completely
         * loaded.
         *
         * @readonly
         * @member {boolean}
         */
        get isComplete(): boolean;
        /**
         * Describes if this resource is currently loading. Is true when the resource starts loading,
         * and is false again when complete.
         *
         * @readonly
         * @member {boolean}
         */
        get isLoading(): boolean;
        /**
         * Marks the resource as complete.
         *
         */
        complete(): void;
        /**
         * Aborts the loading of this resource, with an optional message.
         *
         * @param {string} message - The message to use for the error
         */
        abort(message: string): void;
        /**
         * Kicks off loading of this resource. This method is asynchronous.
         *
         * @param {PIXI.LoaderResource.OnCompleteSignal} [cb] - Optional callback to call once the resource is loaded.
         */
        load(cb?: LoaderResource.OnCompleteSignal): void;
        /**
         * Checks if the flag is set.
         *
         * @param flag - The flag to check.
         * @return True if the flag is set.
         */
        private _hasFlag;
        /**
         * (Un)Sets the flag.
         *
         * @param flag - The flag to (un)set.
         * @param value - Whether to set or (un)set the flag.
         */
        private _setFlag;
        /**
         * Clears all the events from the underlying loading source.
         */
        private _clearEvents;
        /**
         * Finalizes the load.
         */
        private _finish;
        /**
         * Loads this resources using an element that has a single source,
         * like an HTMLImageElement.
         * @private
         * @param type - The type of element to use.
         */
        _loadElement(type: string): void;
        /**
         * Loads this resources using an element that has multiple sources,
         * like an HTMLAudioElement or HTMLVideoElement.
         * @param type - The type of element to use.
         */
        private _loadSourceElement;
        /**
         * Loads this resources using an XMLHttpRequest.
         */
        private _loadXhr;
        /**
         * Loads this resources using an XDomainRequest. This is here because we need to support IE9 (gross).
         */
        private _loadXdr;
        /**
         * Creates a source used in loading via an element.
         * @param type - The element type (video or audio).
         * @param url - The source URL to load from.
         * @param [mime] - The mime type of the video
         * @return The source element.
         */
        private _createSource;
        /**
         * Called if a load errors out.
         *
         * @param event - The error event from the element that emits it.
         */
        private _onError;
        /**
         * Called if a load progress event fires for an element or xhr/xdr.
         * @param event - Progress event.
         */
        private _onProgress;
        /**
         * Called if a timeout event fires for an element.
         */
        private _onTimeout;
        /**
         * Called if an error event fires for xhr/xdr.
         */
        private _xhrOnError;
        /**
         * Called if an error event fires for xhr/xdr.
         */
        private _xhrOnTimeout;
        /**
         * Called if an abort event fires for xhr/xdr.
         */
        private _xhrOnAbort;
        /**
         * Called when data successfully loads from an xhr/xdr request.
         */
        private _xhrOnLoad;
        /**
         * Sets the `crossOrigin` property for this resource based on if the url
         * for this resource is cross-origin. If crossOrigin was manually set, this
         * function does nothing.
         * @private
         * @param url - The url to test.
         * @param [loc=self.location] - The location object to test against.
         * @return The crossOrigin value to use (or empty string for none).
         */
        _determineCrossOrigin(url: string, loc?: any): string;
        /**
         * Determines the responseType of an XHR request based on the extension of the
         * resource being loaded.
         *
         * @private
         * @return {PIXI.LoaderResource.XHR_RESPONSE_TYPE} The responseType to use.
         */
        private _determineXhrType;
        /**
         * Determines the loadType of a resource based on the extension of the
         * resource being loaded.
         *
         * @private
         * @return {PIXI.LoaderResource.LOAD_TYPE} The loadType to use.
         */
        private _determineLoadType;
        /**
         * Extracts the extension (sans '.') of the file being loaded by the resource.
         *
         * @param [url] - url to parse, `this.url` by default.
         * @return The extension.
         */
        private _getExtension;
        /**
         * Determines the mime type of an XHR request based on the responseType of
         * resource being loaded.
         *
         * @param type - The type to get a mime type for.
         * @private
         * @return The mime type to use.
         */
        _getMimeFromXhrType(type: LoaderResource.XHR_RESPONSE_TYPE): string;
    }

    export namespace LoaderResource {
        /**
         * When the resource starts to load.
         *
         * @memberof PIXI.LoaderResource
         * @callback OnStartSignal@callback OnStartSignal
         * @param {Resource} resource - The resource that the event happened on.
         */
        export type OnStartSignal = (resource: LoaderResource) => void;
        /**
         * When the resource reports loading progress.
         *
         * @memberof PIXI.LoaderResource
         * @callback OnProgressSignal@callback OnProgressSignal
         * @param {Resource} resource - The resource that the event happened on.
         * @param {number} percentage - The progress of the load in the range [0, 1].
         */
        export type OnProgressSignal = (resource: LoaderResource, percentage: number) => void;
        /**
         * When the resource finishes loading.
         *
         * @memberof PIXI.LoaderResource
         * @callback OnCompleteSignal@callback OnCompleteSignal
         * @param {Resource} resource - The resource that the event happened on.
         */
        export type OnCompleteSignal = (resource: LoaderResource) => void;
        /**
         * The types of resources a resource could represent.
         *
         * @static
         * @readonly
         * @enum {number}
         * @memberof PIXI.LoaderResource
         */
        export enum STATUS_FLAGS {
            /** None */
            NONE = 0,
            /** Data URL */
            DATA_URL = 1,
            /** Complete */
            COMPLETE = 2,
            /** Loading */
            LOADING = 4
        }
        /**
         * The types of resources a resource could represent.
         *
         * @static
         * @readonly
         * @enum {number}
         * @memberof PIXI.LoaderResource
         */
        export enum TYPE {
            /** Unknown */
            UNKNOWN = 0,
            /** JSON */
            JSON = 1,
            /** XML */
            XML = 2,
            /** Image */
            IMAGE = 3,
            /** Audio */
            AUDIO = 4,
            /** Video */
            VIDEO = 5,
            /** Plain text */
            TEXT = 6
        }
        /**
         * The types of loading a resource can use.
         *
         * @static
         * @readonly
         * @enum {number}
         * @memberof PIXI.LoaderResource
         */
        export enum LOAD_TYPE {
            /** Uses XMLHttpRequest to load the resource. */
            XHR = 1,
            /** Uses an `Image` object to load the resource. */
            IMAGE = 2,
            /** Uses an `Audio` object to load the resource. */
            AUDIO = 3,
            /** Uses a `Video` object to load the resource. */
            VIDEO = 4
        }
        /**
         * The XHR ready states, used internally.
         *
         * @static
         * @readonly
         * @enum {string}
         * @memberof PIXI.LoaderResource
         */
        export enum XHR_RESPONSE_TYPE {
            /** string */
            DEFAULT = "text",
            /** ArrayBuffer */
            BUFFER = "arraybuffer",
            /** Blob */
            BLOB = "blob",
            /** Document */
            DOCUMENT = "document",
            /** Object */
            JSON = "json",
            /** String */
            TEXT = "text"
        }
        const _loadTypeMap: any;
        const _xhrTypeMap: any;
        const EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    }

    /**
     * @memberof PIXI
     */
    export class Signal<CbType = (...args: any) => void> {
        _head: SignalBinding<CbType>;
        _tail: SignalBinding<CbType>;
        /**
         * MiniSignal constructor.
         * @example
         * let mySignal = new Signal();
         * let binding = mySignal.add(onSignal);
         * mySignal.dispatch('foo', 'bar');
         * mySignal.detach(binding);
         */
        constructor();
        /**
         * Return an array of attached SignalBinding.
         *
         * @param {Boolean} [exists=false] - We only need to know if there are handlers.
         * @returns {PIXI.SignalBinding[]|Boolean} Array of attached SignalBinding or Boolean if called with exists = true
         * @api public
         */
        handlers(exists?: boolean): Array<SignalBinding<CbType>> | boolean;
        /**
         * Return true if node is a SignalBinding attached to this MiniSignal
         *
         * @param {PIXI.SignalBinding} node - Node to check.
         * @returns {Boolean} True if node is attache to mini-signal
         */
        has(node: SignalBinding<CbType>): boolean;
        /**
         * Dispaches a signal to all registered listeners.
         *
         * @returns {Boolean} Indication if we've emitted an event.
         */
        dispatch(...args: any[]): boolean;
        /**
         * Register a new listener.
         *
         * @param {Function} fn - Callback function.
         * @param {object} [thisArg] - The context of the callback function.
         * @returns {PIXI.SignalBinding} The SignalBinding node that was added.
         */
        add(fn: CbType, thisArg?: any): SignalBinding<CbType>;
        /**
         * Register a new listener that will be executed only once.
         *
         * @param {Function} fn - Callback function.
         * @param {object} [thisArg] - The context of the callback function.
         * @returns {PIXI.SignalBinding} The SignalBinding node that was added.
         */
        once(fn: CbType, thisArg?: any): SignalBinding<CbType>;
        /**
         * Remove binding object.
         *
         * @param {PIXI.SignalBinding} node - The binding node that will be removed.
         * @returns {Signal} The instance on which this method was called.
         * @api public */
        detach(node: SignalBinding<CbType>): this;
        /**
         * Detach all listeners.
         *
         * @returns {Signal} The instance on which this method was called.
         */
        detachAll(): this;
    }

    /**
     * @memberof PIXI
     */
    export class SignalBinding<CbType> {
        _fn: any;
        _once: boolean;
        _next: SignalBinding<CbType>;
        _prev: SignalBinding<CbType>;
        _owner: Signal<CbType>;
        _thisArg: any;
        /**
         * SignalBinding constructor.
         * @constructs SignalBinding
         * @param {Function} fn - Event handler to be called.
         * @param {Boolean} [once=false] - Should this listener be removed after dispatch
         * @param {object} [thisArg] - The context of the callback function.
         * @api private
         */
        constructor(fn: CbType, once: boolean, thisArg: any);
        detach(): boolean;
    }

    /**
     * Loader plugin for handling Texture resources.
     *
     * @memberof PIXI
     */
    export class TextureLoader {
        /**
         * Handle SVG elements a text, render with SVGResource.
         */
        static add(): void;
        /**
         * Called after a resource is loaded.
         * @see PIXI.Loader.loaderMiddleware
         * @param resource
         * @param {function} next
         */
        static use(resource: LoaderResource, next: (...args: any[]) => void): void;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface LoaderResource {
            /**
             * Texture reference for loading images and other textures.
             */
            texture?: Texture;
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface IResourceMetadata {

        }


        interface Application {
        }

        interface IApplicationOptions {
            sharedLoader?: boolean;
        }
    }
    /////////////////////////////////////////////////
    ////////////////math//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * The Circle object is used to help draw graphics and can also be used to specify a hit area for displayObjects.
     *
     * @memberof PIXI
     */
    export class Circle {
        /** @default 0 */
        x: number;
        /** @default 0 */
        y: number;
        /** @default 0 */
        radius: number;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @default PIXI.SHAPES.CIRC
         * @see PIXI.SHAPES
         */
        readonly type: SHAPES.CIRC;
        /**
         * @param x - The X coordinate of the center of this circle
         * @param y - The Y coordinate of the center of this circle
         * @param radius - The radius of the circle
         */
        constructor(x?: number, y?: number, radius?: number);
        /**
         * Creates a clone of this Circle instance
         *
         * @return A copy of the Circle
         */
        clone(): Circle;
        /**
         * Checks whether the x and y coordinates given are contained within this circle
         *
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @return Whether the x/y coordinates are within this Circle
         */
        contains(x: number, y: number): boolean;
        /**
        * Returns the framing rectangle of the circle as a Rectangle object
        *
        * @return The framing rectangle
        */
        getBounds(): Rectangle;
        toString(): string;
    }

    /**
     * Conversion factor for converting degrees to radians.
     *
     * @static
     * @member {number}
     * @memberof PIXI
     */
    export const DEG_TO_RAD: number;

    /**
     * The Ellipse object is used to help draw graphics and can also be used to specify a hit area for displayObjects.
     *
     * @memberof PIXI
     */
    export class Ellipse {
        /** @default 0 */
        x: number;
        /** @default 0 */
        y: number;
        /** @default 0 */
        width: number;
        /** @default 0 */
        height: number;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @default PIXI.SHAPES.ELIP
         * @see PIXI.SHAPES
         */
        readonly type: SHAPES.ELIP;
        /**
         * @param x - The X coordinate of the center of this ellipse
         * @param y - The Y coordinate of the center of this ellipse
         * @param halfWidth - The half width of this ellipse
         * @param halfHeight - The half height of this ellipse
         */
        constructor(x?: number, y?: number, halfWidth?: number, halfHeight?: number);
        /**
         * Creates a clone of this Ellipse instance
         *
         * @return {PIXI.Ellipse} A copy of the ellipse
         */
        clone(): Ellipse;
        /**
         * Checks whether the x and y coordinates given are contained within this ellipse
         *
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @return Whether the x/y coords are within this ellipse
         */
        contains(x: number, y: number): boolean;
        /**
         * Returns the framing rectangle of the ellipse as a Rectangle object
         *
         * @return The framing rectangle
         */
        getBounds(): Rectangle;
        toString(): string;
    }

    type GD8Symmetry = number;

    /**
     * Implements the dihedral group D8, which is similar to
     * [group D4]{@link http://mathworld.wolfram.com/DihedralGroupD4.html};
     * D8 is the same but with diagonals, and it is used for texture
     * rotations.
     *
     * The directions the U- and V- axes after rotation
     * of an angle of `a: GD8Constant` are the vectors `(uX(a), uY(a))`
     * and `(vX(a), vY(a))`. These aren't necessarily unit vectors.
     *
     * **Origin:**<br>
     *  This is the small part of gameofbombs.com portal system. It works.
     *
     * @see PIXI.groupD8.E
     * @see PIXI.groupD8.SE
     * @see PIXI.groupD8.S
     * @see PIXI.groupD8.SW
     * @see PIXI.groupD8.W
     * @see PIXI.groupD8.NW
     * @see PIXI.groupD8.N
     * @see PIXI.groupD8.NE
     * @author Ivan @ivanpopelyshev
     * @namespace PIXI.groupD8
     * @memberof PIXI
     */
    export const groupD8: {
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 0°       | East      |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        E: number;
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 45°↻     | Southeast |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        SE: number;
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 90°↻     | South     |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        S: number;
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 135°↻    | Southwest |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        SW: number;
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 180°     | West      |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        W: number;
        /**
         * | Rotation    | Direction    |
         * |-------------|--------------|
         * | -135°/225°↻ | Northwest    |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        NW: number;
        /**
         * | Rotation    | Direction    |
         * |-------------|--------------|
         * | -90°/270°↻  | North        |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        N: number;
        /**
         * | Rotation    | Direction    |
         * |-------------|--------------|
         * | -45°/315°↻  | Northeast    |
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        NE: number;
        /**
         * Reflection about Y-axis.
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        MIRROR_VERTICAL: number;
        /**
         * Reflection about the main diagonal.
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        MAIN_DIAGONAL: number;
        /**
         * Reflection about X-axis.
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        MIRROR_HORIZONTAL: number;
        /**
         * Reflection about reverse diagonal.
         *
         * @memberof PIXI.groupD8
         * @constant {PIXI.GD8Symmetry}
         */
        REVERSE_DIAGONAL: number;
        /**
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
         * @return {PIXI.GD8Symmetry} The X-component of the U-axis
         *    after rotating the axes.
         */
        uX: (ind: GD8Symmetry) => GD8Symmetry;
        /**
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
         * @return {PIXI.GD8Symmetry} The Y-component of the U-axis
         *    after rotating the axes.
         */
        uY: (ind: GD8Symmetry) => GD8Symmetry;
        /**
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
         * @return {PIXI.GD8Symmetry} The X-component of the V-axis
         *    after rotating the axes.
         */
        vX: (ind: GD8Symmetry) => GD8Symmetry;
        /**
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
         * @return {PIXI.GD8Symmetry} The Y-component of the V-axis
         *    after rotating the axes.
         */
        vY: (ind: GD8Symmetry) => GD8Symmetry;
        /**
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
         *   is needed. Only rotations have opposite symmetries while
         *   reflections don't.
         * @return {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
         */
        inv: (rotation: GD8Symmetry) => GD8Symmetry;
        /**
         * Composes the two D8 operations.
         *
         * Taking `^` as reflection:
         *
         * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
         * |-------|-----|-----|-----|-----|------|-------|-------|-------|
         * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
         * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
         * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
         * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
         * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
         * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
         * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
         * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
         *
         * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
         *   is the row in the above cayley table.
         * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
         *   is the column in the above cayley table.
         * @return {PIXI.GD8Symmetry} Composed operation
         */
        add: (rotationSecond: GD8Symmetry, rotationFirst: GD8Symmetry) => GD8Symmetry;
        /**
         * Reverse of `add`.
         *
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
         * @param {PIXI.GD8Symmetry} rotationFirst - First operation
         * @return {PIXI.GD8Symmetry} Result
         */
        sub: (rotationSecond: GD8Symmetry, rotationFirst: GD8Symmetry) => GD8Symmetry;
        /**
         * Adds 180 degrees to rotation, which is a commutative
         * operation.
         *
         * @memberof PIXI.groupD8
         * @param {number} rotation - The number to rotate.
         * @returns {number} Rotated number
         */
        rotate180: (rotation: number) => number;
        /**
         * Checks if the rotation angle is vertical, i.e. south
         * or north. It doesn't work for reflections.
         *
         * @memberof PIXI.groupD8
         * @param {PIXI.GD8Symmetry} rotation - The number to check.
         * @returns {boolean} Whether or not the direction is vertical
         */
        isVertical: (rotation: GD8Symmetry) => boolean;
        /**
         * Approximates the vector `V(dx,dy)` into one of the
         * eight directions provided by `groupD8`.
         *
         * @memberof PIXI.groupD8
         * @param {number} dx - X-component of the vector
         * @param {number} dy - Y-component of the vector
         * @return {PIXI.GD8Symmetry} Approximation of the vector into
         *  one of the eight symmetries.
         */
        byDirection: (dx: number, dy: number) => GD8Symmetry;
        /**
         * Helps sprite to compensate texture packer rotation.
         *
         * @memberof PIXI.groupD8
         * @param {PIXI.Matrix} matrix - sprite world matrix
         * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
         * @param {number} tx - sprite anchoring
         * @param {number} ty - sprite anchoring
         */
        matrixAppendRotationInv: (matrix: Matrix, rotation: GD8Symmetry, tx?: number, ty?: number) => void;
    };

    export interface IPoint extends IPointData {
        copyFrom(p: IPointData): this;
        copyTo<T extends IPoint>(p: T): T;
        equals(p: IPointData): boolean;
        set(x?: number, y?: number): void;
    }

    export interface IPointData extends GlobalMixins.IPointData {
        x: number;
        y: number;
    }

    export type IShape = Circle | Ellipse | Polygon | Rectangle | RoundedRectangle;

    export interface ISize {
        width: number;
        height: number;
    }

    /**
     * The PixiJS Matrix as a class makes it a lot faster.
     *
     * Here is a representation of it:
     * ```js
     * | a | c | tx|
     * | b | d | ty|
     * | 0 | 0 | 1 |
     * ```
     *
     * @memberof PIXI
     */
    export class Matrix {
        /** @default 1 */
        a: number;
        /** @default 0 */
        b: number;
        /** @default 0 */
        c: number;
        /** @default 1 */
        d: number;
        /** @default 0 */
        tx: number;
        /** @default 0 */
        ty: number;
        array: Float32Array | null;
        /**
         * @param a - x scale
         * @param b - y skew
         * @param c - x skew
         * @param d - y scale
         * @param tx - x translation
         * @param ty - y translation
         */
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        /**
         * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
         *
         * a = array[0]
         * b = array[1]
         * c = array[3]
         * d = array[4]
         * tx = array[2]
         * ty = array[5]
         *
         * @param array - The array that the matrix will be populated from.
         */
        fromArray(array: number[]): void;
        /**
         * Sets the matrix properties.
         *
         * @param a - Matrix component
         * @param b - Matrix component
         * @param c - Matrix component
         * @param d - Matrix component
         * @param tx - Matrix component
         * @param ty - Matrix component
         * @return This matrix. Good for chaining method calls.
         */
        set(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
        /**
         * Creates an array from the current Matrix object.
         *
         * @param transpose - Whether we need to transpose the matrix or not
         * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
         * @return The newly created array which contains the matrix
         */
        toArray(transpose: boolean, out?: Float32Array): Float32Array;
        /**
         * Get a new position with the current transformation applied.
         * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
         *
         * @param pos - The origin
         * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
         * @return {PIXI.Point} The new point, transformed through this matrix
         */
        apply<P extends IPointData = Point>(pos: IPointData, newPos?: P): P;
        /**
         * Get a new position with the inverse of the current transformation applied.
         * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
         *
         * @param pos - The origin
         * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
         * @return {PIXI.Point} The new point, inverse-transformed through this matrix
         */
        applyInverse<P extends IPointData = Point>(pos: IPointData, newPos?: P): P;
        /**
         * Translates the matrix on the x and y.
         *
         * @param x - How much to translate x by
         * @param y - How much to translate y by
         * @return This matrix. Good for chaining method calls.
         */
        translate(x: number, y: number): this;
        /**
         * Applies a scale transformation to the matrix.
         *
         * @param x - The amount to scale horizontally
         * @param y - The amount to scale vertically
         * @return This matrix. Good for chaining method calls.
         */
        scale(x: number, y: number): this;
        /**
         * Applies a rotation transformation to the matrix.
         *
         * @param angle - The angle in radians.
         * @return This matrix. Good for chaining method calls.
         */
        rotate(angle: number): this;
        /**
         * Appends the given Matrix to this Matrix.
         *
         * @param matrix - The matrix to append.
         * @return This matrix. Good for chaining method calls.
         */
        append(matrix: Matrix): this;
        /**
         * Sets the matrix based on all the available properties
         *
         * @param x - Position on the x axis
         * @param y - Position on the y axis
         * @param pivotX - Pivot on the x axis
         * @param pivotY - Pivot on the y axis
         * @param scaleX - Scale on the x axis
         * @param scaleY - Scale on the y axis
         * @param rotation - Rotation in radians
         * @param skewX - Skew on the x axis
         * @param skewY - Skew on the y axis
         * @return This matrix. Good for chaining method calls.
         */
        setTransform(x: number, y: number, pivotX: number, pivotY: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number): this;
        /**
         * Prepends the given Matrix to this Matrix.
         *
         * @param matrix - The matrix to prepend
         * @return This matrix. Good for chaining method calls.
         */
        prepend(matrix: Matrix): this;
        /**
         * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
         *
         * @param transform - The transform to apply the properties to.
         * @return The transform with the newly applied properties
         */
        decompose(transform: Transform): Transform;
        /**
         * Inverts this matrix
         *
         * @return This matrix. Good for chaining method calls.
         */
        invert(): this;
        /**
         * Resets this Matrix to an identity (default) matrix.
         *
         * @return This matrix. Good for chaining method calls.
         */
        identity(): this;
        /**
         * Creates a new Matrix object with the same values as this one.
         *
         * @return A copy of this matrix. Good for chaining method calls.
         */
        clone(): Matrix;
        /**
         * Changes the values of the given matrix to be the same as the ones in this matrix
         *
         * @param matrix - The matrix to copy to.
         * @return The matrix given in parameter with its values updated.
         */
        copyTo(matrix: Matrix): Matrix;
        /**
         * Changes the values of the matrix to be the same as the ones in given matrix
         *
         * @param {PIXI.Matrix} matrix - The matrix to copy from.
         * @return {PIXI.Matrix} this
         */
        copyFrom(matrix: Matrix): this;
        toString(): string;
        /**
         * A default (identity) matrix
         *
         * @readonly
         */
        static get IDENTITY(): Matrix;
        /**
         * A temp matrix
         *
         * @readonly
         */
        static get TEMP_MATRIX(): Matrix;
    }

    export interface ObservablePoint extends GlobalMixins.Point, IPoint {
    }

    /**
     * The ObservablePoint object represents a location in a two-dimensional coordinate system, where `x` represents
     * the position on the horizontal axis and `y` represents the position on the vertical axis.
     *
     * An `ObservablePoint` is a point that triggers a callback when the point's position is changed.
     *
     * @memberof PIXI
     */
    export class ObservablePoint<T = any> implements IPoint {
        /** The callback function triggered when `x` and/or `y` are changed */
        cb: (this: T) => any;
        /** The owner of the callback */
        scope: any;
        _x: number;
        _y: number;
        /**
         * Creates a new `ObservablePoint`
         *
         * @param cb - callback function triggered when `x` and/or `y` are changed
         * @param scope - owner of callback
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=0] - position of the point on the y axis
        */
        constructor(cb: (this: T) => any, scope: T, x?: number, y?: number);
        /**
         * Creates a clone of this point.
         * The callback and scope params can be overridden otherwise they will default
         * to the clone object's values.
         *
         * @override
         * @param cb - The callback function triggered when `x` and/or `y` are changed
         * @param scope - The owner of the callback
         * @return a copy of this observable point
         */
        clone(cb?: (this: T) => any, scope?: any): ObservablePoint;
        /**
         * Sets the point to a new `x` and `y` position.
         * If `y` is omitted, both `x` and `y` will be set to `x`.
         *
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=x] - position of the point on the y axis
         * @returns The observable point instance itself
         */
        set(x?: number, y?: number): this;
        /**
         * Copies x and y from the given point (`p`)
         *
         * @param p - The point to copy from. Can be any of type that is or extends `IPointData`
         * @returns The observable point instance itself
         */
        copyFrom(p: IPointData): this;
        /**
         * Copies this point's x and y into that of the given point (`p`)
         *
         * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
         * @returns The point (`p`) with values updated
         */
        copyTo<T extends IPoint>(p: T): T;
        /**
         * Accepts another point (`p`) and returns `true` if the given point is equal to this point
         *
         * @param p - The point to check
         * @returns Returns `true` if both `x` and `y` are equal
         */
        equals(p: IPointData): boolean;
        toString(): string;
        /** Position of the observable point on the x axis. */
        get x(): number;
        set x(value: number);
        /** Position of the observable point on the y axis. */
        get y(): number;
        set y(value: number);
    }

    /**
     * Two Pi.
     *
     * @static
     * @member {number}
     * @memberof PIXI
     */
    export const PI_2: number;

    export interface Point extends GlobalMixins.Point, IPoint {
    }

    /**
     * The Point object represents a location in a two-dimensional coordinate system, where `x` represents
     * the position on the horizontal axis and `y` represents the position on the vertical axis
     *
     * @class
     * @memberof PIXI
     * @implements IPoint
     */
    export class Point implements IPoint {
        /** Position of the point on the x axis */
        x: number;
        /** Position of the point on the y axis */
        y: number;
        /** Creates a new `Point`
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=0] - position of the point on the y axis
         */
        constructor(x?: number, y?: number);
        /** Creates a clone of this point
         * @returns A clone of this point
         */
        clone(): Point;
        /**
         * Copies `x` and `y` from the given point into this point
         *
         * @param p - The point to copy from
         * @returns The point instance itself
         */
        copyFrom(p: IPointData): this;
        /**
         * Copies this point's x and y into the given point (`p`).
         *
         * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
         * @returns The point (`p`) with values updated
         */
        copyTo<T extends IPoint>(p: T): T;
        /**
         * Accepts another point (`p`) and returns `true` if the given point is equal to this point
         *
         * @param p - The point to check
         * @returns Returns `true` if both `x` and `y` are equal
         */
        equals(p: IPointData): boolean;
        /**
         * Sets the point to a new `x` and `y` position.
         * If `y` is omitted, both `x` and `y` will be set to `x`.
         *
         * @param {number} [x=0] - position of the point on the `x` axis
         * @param {number} [y=x] - position of the point on the `y` axis
         * @returns The point instance itself
         */
        set(x?: number, y?: number): this;
        toString(): string;
    }

    /**
     * A class to define a shape via user defined coordinates.
     *
     * @memberof PIXI
     */
    export class Polygon {
        /** An array of the points of this polygon. */
        points: number[];
        /** `false` after moveTo, `true` after `closePath`. In all other cases it is `true`. */
        closeStroke: boolean;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @default PIXI.SHAPES.POLY
         * @see PIXI.SHAPES
         */
        readonly type: SHAPES.POLY;
        constructor(points: IPointData[] | number[]);
        constructor(...points: IPointData[] | number[]);
        /**
         * Creates a clone of this polygon.
         *
         * @return - A copy of the polygon.
         */
        clone(): Polygon;
        /**
         * Checks whether the x and y coordinates passed to this function are contained within this polygon.
         *
         * @param x - The X coordinate of the point to test.
         * @param y - The Y coordinate of the point to test.
         * @return - Whether the x/y coordinates are within this polygon.
         */
        contains(x: number, y: number): boolean;
        toString(): string;
    }

    /**
     * Conversion factor for converting radians to degrees.
     *
     * @static
     * @member {number} RAD_TO_DEG
     * @memberof PIXI
     */
    export const RAD_TO_DEG: number;

    export interface Rectangle extends GlobalMixins.Rectangle {
    }

    /**
     * Size object, contains width and height
     *
     * @memberof PIXI
     * @typedef {object} ISize
     */
    /**
     * Rectangle object is an area defined by its position, as indicated by its top-left corner
     * point (x, y) and by its width and its height.
     *
     * @memberof PIXI
     */
    export class Rectangle {
        /** @default 0 */
        x: number;
        /** @default 0 */
        y: number;
        /** @default 0 */
        width: number;
        /** @default 0 */
        height: number;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         * @default PIXI.SHAPES.RECT
         * @see PIXI.SHAPES
         */
        readonly type: SHAPES.RECT;
        /**
         * @param x - The X coordinate of the upper-left corner of the rectangle
         * @param y - The Y coordinate of the upper-left corner of the rectangle
         * @param width - The overall width of the rectangle
         * @param height - The overall height of the rectangle
         */
        constructor(x?: number, y?: number, width?: number, height?: number);
        /** Returns the left edge of the rectangle. */
        get left(): number;
        /** Returns the right edge of the rectangle. */
        get right(): number;
        /** Returns the top edge of the rectangle. */
        get top(): number;
        /** Returns the bottom edge of the rectangle. */
        get bottom(): number;
        /** A constant empty rectangle. */
        static get EMPTY(): Rectangle;
        /**
         * Creates a clone of this Rectangle
         *
         * @return a copy of the rectangle
         */
        clone(): Rectangle;
        /**
         * Copies another rectangle to this one.
         *
         * @param rectangle - The rectangle to copy from.
         * @return Returns itself.
         */
        copyFrom(rectangle: Rectangle): Rectangle;
        /**
         * Copies this rectangle to another one.
         *
         * @param rectangle - The rectangle to copy to.
         * @return Returns given parameter.
         */
        copyTo(rectangle: Rectangle): Rectangle;
        /**
         * Checks whether the x and y coordinates given are contained within this Rectangle
         *
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @return Whether the x/y coordinates are within this Rectangle
         */
        contains(x: number, y: number): boolean;
        /**
         * Pads the rectangle making it grow in all directions.
         * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
         *
         * @param paddingX - The horizontal padding amount.
         * @param paddingY - The vertical padding amount.
         * @return Returns itself.
         */
        pad(paddingX?: number, paddingY?: number): this;
        /**
         * Fits this rectangle around the passed one.
         *
         * @param rectangle - The rectangle to fit.
         * @return Returns itself.
         */
        fit(rectangle: Rectangle): this;
        /**
         * Enlarges rectangle that way its corners lie on grid
         *
         * @param resolution - resolution
         * @param eps - precision
         * @return Returns itself.
         */
        ceil(resolution?: number, eps?: number): this;
        /**
         * Enlarges this rectangle to include the passed rectangle.
         *
         * @param rectangle - The rectangle to include.
         * @return Returns itself.
         */
        enlarge(rectangle: Rectangle): this;
        toString(): string;
    }

    /**
     * The Rounded Rectangle object is an area that has nice rounded corners, as indicated by its
     * top-left corner point (x, y) and by its width and its height and its radius.
     *
     * @class
     * @memberof PIXI
     */
    export class RoundedRectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        readonly type: SHAPES.RREC;
        /**
         * @param {number} [x=0] - The X coordinate of the upper-left corner of the rounded rectangle
         * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rounded rectangle
         * @param {number} [width=0] - The overall width of this rounded rectangle
         * @param {number} [height=0] - The overall height of this rounded rectangle
         * @param {number} [radius=20] - Controls the radius of the rounded corners
         */
        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);
        /**
         * Creates a clone of this Rounded Rectangle
         *
         * @return {PIXI.RoundedRectangle} a copy of the rounded rectangle
         */
        clone(): RoundedRectangle;
        /**
         * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
         *
         * @param {number} x - The X coordinate of the point to test
         * @param {number} y - The Y coordinate of the point to test
         * @return {boolean} Whether the x/y coordinates are within this Rounded Rectangle
         */
        contains(x: number, y: number): boolean;
        toString(): string;
    }

    /**
     * Constants that identify shapes, mainly to prevent `instanceof` calls.
     *
     * @static
     * @memberof PIXI
     * @enum {number}
     * @property {number} POLY Polygon
     * @property {number} RECT Rectangle
     * @property {number} CIRC Circle
     * @property {number} ELIP Ellipse
     * @property {number} RREC Rounded Rectangle
     */
    export enum SHAPES {
        POLY = 0,
        RECT = 1,
        CIRC = 2,
        ELIP = 3,
        RREC = 4
    }

    export interface Transform extends GlobalMixins.Transform {
    }

    /**
     * Transform that takes care about its versions.
     *
     * @memberof PIXI
     */
    export class Transform {
        /** A default (identity) transform. */
        static readonly IDENTITY: Transform;
        /** The world transformation matrix. */
        worldTransform: Matrix;
        /** The local transformation matrix. */
        localTransform: Matrix;
        /** The coordinate of the object relative to the local coordinates of the parent. */
        position: ObservablePoint;
        /** The scale factor of the object. */
        scale: ObservablePoint;
        /** The pivot point of the displayObject that it rotates around. */
        pivot: ObservablePoint;
        /** The skew amount, on the x and y axis. */
        skew: ObservablePoint;
        /**
         * The locally unique ID of the parent's world transform
         * used to calculate the current world transformation matrix.
         */
        _parentID: number;
        /** The locally unique ID of the world transform. */
        _worldID: number;
        /** The rotation amount. */
        protected _rotation: number;
        /**
         * The X-coordinate value of the normalized local X axis,
         * the first column of the local transformation matrix without a scale.
         */
        protected _cx: number;
        /**
         * The Y-coordinate value of the normalized local X axis,
         * the first column of the local transformation matrix without a scale.
         */
        protected _sx: number;
        /**
         * The X-coordinate value of the normalized local Y axis,
         * the second column of the local transformation matrix without a scale.
         */
        protected _cy: number;
        /**
         * The Y-coordinate value of the normalized local Y axis,
         * the second column of the local transformation matrix without a scale.
         */
        protected _sy: number;
        /** The locally unique ID of the local transform. */
        protected _localID: number;
        /**
         * The locally unique ID of the local transform
         * used to calculate the current local transformation matrix.
         */
        protected _currentLocalID: number;
        constructor();
        /** Called when a value changes. */
        protected onChange(): void;
        /** Called when the skew or the rotation changes. */
        protected updateSkew(): void;
        toString(): string;
        /** Updates the local transformation matrix. */
        updateLocalTransform(): void;
        /**
         * Updates the local and the world transformation matrices.
         *
         * @param parentTransform - The parent transform
         */
        updateTransform(parentTransform: Transform): void;
        /**
         * Decomposes a matrix and sets the transforms properties based on it.
         *
         * @param matrix - The matrix to decompose
         */
        setFromMatrix(matrix: Matrix): void;
        /** The rotation of the object in radians. */
        get rotation(): number;
        set rotation(value: number);
    }

    //------------ global.d.ts
    namespace GlobalMixins {

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface IPointData {
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Point {
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface ObservablePoint {
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Rectangle {
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Transform {
        }
    }
    /////////////////////////////////////////////////
    ////////////////mesh//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    export interface IMeshMaterialOptions {
        alpha?: number;
        tint?: number;
        pluginName?: string;
        program?: Program;
        uniforms?: any;
    }

    export interface Mesh extends GlobalMixins.Mesh {
    }

    /**
     * Base mesh class.
     *
     * This class empowers you to have maximum flexibility to render any kind of WebGL visuals you can think of.
     * This class assumes a certain level of WebGL knowledge.
     * If you know a bit this should abstract enough away to make your life easier!
     *
     * Pretty much ALL WebGL can be broken down into the following:
     * - Geometry - The structure and data for the mesh. This can include anything from positions, uvs, normals, colors etc..
     * - Shader - This is the shader that PixiJS will render the geometry with (attributes in the shader must match the geometry)
     * - State - This is the state of WebGL required to render the mesh.
     *
     * Through a combination of the above elements you can render anything you want, 2D or 3D!
     *
     * @memberof PIXI
     */
    export class Mesh<T extends Shader = MeshMaterial> extends Container {
        /**
         * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
         * Can be shared between multiple Mesh objects.
         *
         * @type {PIXI.Shader|PIXI.MeshMaterial}
         */
        shader: T;
        /**
         * Represents the WebGL state the Mesh required to render, excludes shader and geometry. E.g.,
         * blend mode, culling, depth testing, direction of rendering triangles, backface, etc.
         */
        state: State;
        /** The way the Mesh should be drawn, can be any of the {@link PIXI.DRAW_MODES} constants. */
        drawMode: DRAW_MODES;
        /**
         * Typically the index of the IndexBuffer where to start drawing.
         *
         * @default 0
         */
        start: number;
        /**
         * How much of the geometry to draw, by default `0` renders everything.
         *
         * @default 0
         */
        size: number;
        private _geometry;
        /** This is the caching layer used by the batcher. */
        private vertexData;
        /**
         * If geometry is changed used to decide to re-transform
         * the vertexData.
         */
        private vertexDirty;
        private _transformID;
        /** Internal roundPixels field. */
        private _roundPixels;
        /** Batched UV's are cached for atlas textures. */
        private batchUvs;
        /**
         * These are used as easy access for batching.
         *
         * @private
         */
        uvs: Float32Array;
        /**
         * These are used as easy access for batching.
         *
         * @private
         */
        indices: Uint16Array;
        _tintRGB: number;
        _texture: Texture;
        /**
         * @param geometry - The geometry the mesh will use.
         * @param {PIXI.MeshMaterial} shader - The shader the mesh will use.
         * @param state - The state that the WebGL context is required to be in to render the mesh
         *        if no state is provided, uses {@link PIXI.State.for2d} to create a 2D state for PixiJS.
         * @param drawMode - The drawMode, can be any of the {@link PIXI.DRAW_MODES} constants.
         */
        constructor(geometry: Geometry, shader: T, state?: State, drawMode?: DRAW_MODES);
        /**
         * Includes vertex positions, face indices, normals, colors, UVs, and
         * custom attributes within buffers, reducing the cost of passing all
         * this data to the GPU. Can be shared between multiple Mesh objects.
         */
        get geometry(): Geometry;
        set geometry(value: Geometry);
        /**
         * To change mesh uv's, change its uvBuffer data and increment its _updateID.
         *
         * @readonly
         */
        get uvBuffer(): Buffer_2;
        /**
         * To change mesh vertices, change its uvBuffer data and increment its _updateID.
         * Incrementing _updateID is optional because most of Mesh objects do it anyway.
         *
         * @readonly
         */
        get verticesBuffer(): Buffer_2;
        /** Alias for {@link PIXI.Mesh#shader}. */
        set material(value: T);
        get material(): T;
        /**
         * The blend mode to be applied to the Mesh. Apply a value of
         * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
         *
         * @default PIXI.BLEND_MODES.NORMAL;
         */
        set blendMode(value: BLEND_MODES);
        get blendMode(): BLEND_MODES;
        /**
         * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
         * Advantages can include sharper image quality (like text) and faster rendering on canvas.
         * The main disadvantage is movement of objects may appear less smooth.
         * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
         *
         * @default false
         */
        set roundPixels(value: boolean);
        get roundPixels(): boolean;
        /**
         * The multiply tint applied to the Mesh. This is a hex value. A value of
         * `0xFFFFFF` will remove any tint effect.
         *
         * Null for non-MeshMaterial shaders
         *
         * @default 0xFFFFFF
         */
        get tint(): number;
        set tint(value: number);
        /**
         * The texture that the Mesh uses.
         *
         * Null for non-MeshMaterial shaders
         */
        get texture(): Texture;
        set texture(value: Texture);
        /**
         * Standard renderer draw.
         *
         * @param renderer - Instance to renderer.
         */
        protected _render(renderer: Renderer): void;
        /**
         * Standard non-batching way of rendering.
         *
         * @param renderer - Instance to renderer.
         */
        protected _renderDefault(renderer: Renderer): void;
        /**
         * Rendering by using the Batch system.
         *
         * @param renderer - Instance to renderer.
         */
        protected _renderToBatch(renderer: Renderer): void;
        /** Updates vertexData field based on transform and vertices. */
        calculateVertices(): void;
        /** Updates uv field based on from geometry uv's or batchUvs. */
        calculateUvs(): void;
        /**
         * Updates the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.
         * there must be a aVertexPosition attribute present in the geometry for bounds to be calculated correctly.
         */
        protected _calculateBounds(): void;
        /**
         * Tests if a point is inside this mesh. Works only for PIXI.DRAW_MODES.TRIANGLES.
         *
         * @param point - The point to test.
         * @return - The result of the test.
         */
        containsPoint(point: IPointData): boolean;
        destroy(options?: IDestroyOptions | boolean): void;
        /**
         * The maximum number of vertices to consider batchable. Generally, the complexity
         * of the geometry.
         */
        static BATCHABLE_SIZE: number;
    }

    /**
     * Class controls cache for UV mapping from Texture normal space to BaseTexture normal space.
     *
     * @class
     * @memberof PIXI
     */
    export class MeshBatchUvs {
        readonly data: Float32Array;
        uvBuffer: Buffer_2;
        uvMatrix: TextureMatrix;
        private _bufferUpdateId;
        private _textureUpdateId;
        _updateID: number;
        /**
         * @param {PIXI.Buffer} uvBuffer - Buffer with normalized uv's
         * @param {PIXI.TextureMatrix} uvMatrix - Material UV matrix
         */
        constructor(uvBuffer: Buffer_2, uvMatrix: TextureMatrix);
        /**
         * updates
         *
         * @param {boolean} [forceUpdate] - force the update
         */
        update(forceUpdate?: boolean): void;
    }

    /**
     * Standard 2D geometry used in PixiJS.
     *
     * Geometry can be defined without passing in a style or data if required.
     *
     * ```js
     * const geometry = new PIXI.Geometry();
     *
     * geometry.addAttribute('positions', [0, 0, 100, 0, 100, 100, 0, 100], 2);
     * geometry.addAttribute('uvs', [0,0,1,0,1,1,0,1], 2);
     * geometry.addIndex([0,1,2,1,3,2]);
     *
     * ```
     * @class
     * @memberof PIXI
     * @extends PIXI.Geometry
     */
    export class MeshGeometry extends Geometry {
        _updateId: number;
        /**
         * @param {Float32Array|number[]} [vertices] - Positional data on geometry.
         * @param {Float32Array|number[]} [uvs] - Texture UVs.
         * @param {Uint16Array|number[]} [index] - IndexBuffer
         */
        constructor(vertices?: IArrayBuffer, uvs?: IArrayBuffer, index?: IArrayBuffer);
        /**
         * If the vertex position is updated.
         * @member {number}
         * @readonly
         * @private
         */
        get vertexDirtyId(): number;
    }

    export interface MeshMaterial extends GlobalMixins.MeshMaterial {
    }

    /**
     * Slightly opinionated default shader for PixiJS 2D objects.
     * @class
     * @memberof PIXI
     * @extends PIXI.Shader
     */
    export class MeshMaterial extends Shader {
        readonly uvMatrix: TextureMatrix;
        batchable: boolean;
        pluginName: string;
        _tintRGB: number;
        private _colorDirty;
        private _alpha;
        private _tint;
        /**
         * @param {PIXI.Texture} uSampler - Texture that material uses to render.
         * @param {object} [options] - Additional options
         * @param {number} [options.alpha=1] - Default alpha.
         * @param {number} [options.tint=0xFFFFFF] - Default tint.
         * @param {string} [options.pluginName='batch'] - Renderer plugin for batching.
         * @param {PIXI.Program} [options.program=0xFFFFFF] - Custom program.
         * @param {object} [options.uniforms] - Custom uniforms.
         */
        constructor(uSampler: Texture, options?: IMeshMaterialOptions);
        /**
         * Reference to the texture being rendered.
         * @member {PIXI.Texture}
         */
        get texture(): Texture;
        set texture(value: Texture);
        /**
         * This gets automatically set by the object using this.
         *
         * @default 1
         * @member {number}
         */
        set alpha(value: number);
        get alpha(): number;
        /**
         * Multiply tint for the material.
         * @member {number}
         * @default 0xFFFFFF
         */
        set tint(value: number);
        get tint(): number;
        /**
         * Gets called automatically by the Mesh. Intended to be overridden for custom
         * MeshMaterial objects.
         */
        update(): void;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Mesh {

        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface MeshMaterial {

        }
    }
    /////////////////////////////////////////////////
    ////////////////mesh-extras//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    export interface NineSlicePlane extends GlobalMixins.NineSlicePlane {
    }

    /**
     * The NineSlicePlane allows you to stretch a texture using 9-slice scaling. The corners will remain unscaled (useful
     * for buttons with rounded corners for example) and the other areas will be scaled horizontally and or vertically
     *
     *```js
     * let Plane9 = new PIXI.NineSlicePlane(PIXI.Texture.from('BoxWithRoundedCorners.png'), 15, 15, 15, 15);
     *  ```
     * <pre>
     *      A                          B
     *    +---+----------------------+---+
     *  C | 1 |          2           | 3 |
     *    +---+----------------------+---+
     *    |   |                      |   |
     *    | 4 |          5           | 6 |
     *    |   |                      |   |
     *    +---+----------------------+---+
     *  D | 7 |          8           | 9 |
     *    +---+----------------------+---+
    
     *  When changing this objects width and/or height:
     *     areas 1 3 7 and 9 will remain unscaled.
     *     areas 2 and 8 will be stretched horizontally
     *     areas 4 and 6 will be stretched vertically
     *     area 5 will be stretched both horizontally and vertically
     * </pre>
     *
     * @memberof PIXI
     */
    export class NineSlicePlane extends SimplePlane {
        private _origWidth;
        private _origHeight;
        /**
         * The width of the left column (a).
         *
         * @private
         */
        _leftWidth: number;
        /**
         * The width of the right column (b)
         *
         * @private
         */
        _rightWidth: number;
        /**
         * The height of the top row (c)
         *
         * @private
         */
        _topHeight: number;
        /**
         * The height of the bottom row (d)
         *
         * @private
         */
        _bottomHeight: number;
        /**
         * @param texture - The texture to use on the NineSlicePlane.
         * @param {number} [leftWidth=10] - size of the left vertical bar (A)
         * @param {number} [topHeight=10] - size of the top horizontal bar (C)
         * @param {number} [rightWidth=10] - size of the right vertical bar (B)
         * @param {number} [bottomHeight=10] - size of the bottom horizontal bar (D)
         */
        constructor(texture: Texture, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number);
        textureUpdated(): void;
        get vertices(): ITypedArray;
        set vertices(value: ITypedArray);
        /** Updates the horizontal vertices. */
        updateHorizontalVertices(): void;
        /** Updates the vertical vertices. */
        updateVerticalVertices(): void;
        /**
         * Returns the smaller of a set of vertical and horizontal scale of nine slice corners.
         *
         * @return Smaller number of vertical and horizontal scale.
         */
        private _getMinScale;
        /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
        get width(): number;
        set width(value: number);
        /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
        get height(): number;
        set height(value: number);
        /** The width of the left column. */
        get leftWidth(): number;
        set leftWidth(value: number);
        /** The width of the right column. */
        get rightWidth(): number;
        set rightWidth(value: number);
        /** The height of the top row. */
        get topHeight(): number;
        set topHeight(value: number);
        /** The height of the bottom row. */
        get bottomHeight(): number;
        set bottomHeight(value: number);
        /** Refreshes NineSlicePlane coords. All of them. */
        protected _refresh();
    }

    /**
     * @memberof PIXI
     */
    export class PlaneGeometry extends MeshGeometry {
        segWidth: number;
        segHeight: number;
        width: number;
        height: number;
        /**
         * @param width - The width of the plane.
         * @param height - The height of the plane.
         * @param segWidth - Number of horizontal segments.
         * @param segHeight - Number of vertical segments.
         */
        constructor(width?: number, height?: number, segWidth?: number, segHeight?: number);
        /**
         * Refreshes plane coordinates
         * @private
         */
        build(): void;
    }

    /**
     * RopeGeometry allows you to draw a geometry across several points and then manipulate these points.
     *
     * ```js
     * for (let i = 0; i < 20; i++) {
     *     points.push(new PIXI.Point(i * 50, 0));
     * };
     * const rope = new PIXI.RopeGeometry(100, points);
     * ```
     *
     * @class
     * @extends PIXI.MeshGeometry
     * @memberof PIXI
     *
     */
    export class RopeGeometry extends MeshGeometry {
        points: IPoint[];
        readonly textureScale: number;
        _width: number;
        /**
         * @param {number} [width=200] - The width (i.e., thickness) of the rope.
         * @param {PIXI.Point[]} [points] - An array of {@link PIXI.Point} objects to construct this rope.
         * @param {number} [textureScale=0] - By default the rope texture will be stretched to match
         *     rope length. If textureScale is positive this value will be treated as a scaling
         *     factor and the texture will preserve its aspect ratio instead. To create a tiling rope
         *     set baseTexture.wrapMode to {@link PIXI.WRAP_MODES.REPEAT} and use a power of two texture,
         *     then set textureScale=1 to keep the original texture pixel size.
         *     In order to reduce alpha channel artifacts provide a larger texture and downsample -
         *     i.e. set textureScale=0.5 to scale it down twice.
         */
        constructor(width: number, points: IPoint[], textureScale?: number);
        /**
         * The width (i.e., thickness) of the rope.
         * @member {number}
         * @readOnly
         */
        get width(): number;
        /**
         * Refreshes Rope indices and uvs
         * @private
         */
        private build;
        /**
         * refreshes vertices of Rope mesh
         */
        updateVertices(): void;
        update(): void;
    }

    /**
     * The Simple Mesh class mimics Mesh in PixiJS v4, providing easy-to-use constructor arguments.
     * For more robust customization, use {@link PIXI.Mesh}.
     *
     * @memberof PIXI
     */
    export class SimpleMesh extends Mesh {
        /** Upload vertices buffer each frame. */
        autoUpdate: boolean;
        /**
         * @param texture - The texture to use
         * @param {Float32Array} [vertices] - if you want to specify the vertices
         * @param {Float32Array} [uvs] - if you want to specify the uvs
         * @param {Uint16Array} [indices] - if you want to specify the indices
         * @param drawMode - the drawMode, can be any of the Mesh.DRAW_MODES consts
         */
        constructor(texture?: Texture, vertices?: IArrayBuffer, uvs?: IArrayBuffer, indices?: IArrayBuffer, drawMode?: DRAW_MODES);
        /**
         * Collection of vertices data.
         * @type {Float32Array}
         */
        get vertices(): ITypedArray;
        set vertices(value: ITypedArray);
        _render(renderer: Renderer): void;
    }

    /**
     * The SimplePlane allows you to draw a texture across several points and then manipulate these points
     *
     *```js
     * for (let i = 0; i < 20; i++) {
     *     points.push(new PIXI.Point(i * 50, 0));
     * };
     * let SimplePlane = new PIXI.SimplePlane(PIXI.Texture.from("snake.png"), points);
     *  ```
     *
     * @memberof PIXI
     */
    export class SimplePlane extends Mesh {
        /** The geometry is automatically updated when the texture size changes. */
        autoResize: boolean;
        protected _textureID: number;
        /**
         * @param texture - The texture to use on the SimplePlane.
         * @param verticesX - The number of vertices in the x-axis
         * @param verticesY - The number of vertices in the y-axis
         */
        constructor(texture: Texture, verticesX: number, verticesY: number);
        /**
         * Method used for overrides, to do something in case texture frame was changed.
         * Meshes based on plane can override it and change more details based on texture.
         */
        textureUpdated(): void;
        set texture(value: Texture);
        get texture(): Texture;
        _render(renderer: Renderer): void;
        destroy(options?: IDestroyOptions | boolean): void;
    }

    /**
     * The rope allows you to draw a texture across several points and then manipulate these points
     *
     *```js
     * for (let i = 0; i < 20; i++) {
     *     points.push(new PIXI.Point(i * 50, 0));
     * };
     * let rope = new PIXI.SimpleRope(PIXI.Texture.from("snake.png"), points);
     *  ```
     *
     * @memberof PIXI
     */
    export class SimpleRope extends Mesh {
        autoUpdate: boolean;
        /**
         * @param texture - The texture to use on the rope.
         * @param points - An array of {@link PIXI.Point} objects to construct this rope.
         * @param {number} textureScale - Optional. Positive values scale rope texture
         * keeping its aspect ratio. You can reduce alpha channel artifacts by providing a larger texture
         * and downsampling here. If set to zero, texture will be stretched instead.
         */
        constructor(texture: Texture, points: IPoint[], textureScale?: number);
        _render(renderer: Renderer): void;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface NineSlicePlane {

        }
    }
    /////////////////////////////////////////////////
    ////////////////mixin-cache-as-bitmap//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * @class
     * @ignore
     * @private
     */
    export class CacheData {
        textureCacheId: string;
        originalRender: (renderer: Renderer) => void;
        originalRenderCanvas: (renderer: AbstractRenderer) => void;
        originalCalculateBounds: () => void;
        originalGetLocalBounds: (rect?: Rectangle) => Rectangle;
        originalUpdateTransform: () => void;
        originalDestroy: (options?: IDestroyOptions | boolean) => void;
        originalMask: Container | MaskData;
        originalFilterArea: Rectangle;
        originalContainsPoint: (point: IPointData) => boolean;
        sprite: Sprite;
        constructor();
    }

    /////////////////////////////////////////////////
    ////////////////mixin-get-child-by-name//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />

    /////////////////////////////////////////////////
    ////////////////mixin-get-global-position//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />

    /////////////////////////////////////////////////
    ////////////////particle-container//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    export interface IParticleProperties {
        vertices?: boolean;
        position?: boolean;
        rotation?: boolean;
        uvs?: boolean;
        tint?: boolean;
        alpha?: boolean;
        scale?: boolean;
    }

    export interface IParticleRendererProperty {
        attributeName: string;
        size: number;
        type?: TYPES;
        uploadFunction: (...params: any[]) => any;
        offset: number;
    }

    /**
     * The particle buffer manages the static and dynamic buffers for a particle container.
     *
     * @private
     * @memberof PIXI
     */
    class ParticleBuffer {
        geometry: Geometry;
        staticStride: number;
        staticBuffer: Buffer_2;
        staticData: Float32Array;
        staticDataUint32: Uint32Array;
        dynamicStride: number;
        dynamicBuffer: Buffer_2;
        dynamicData: Float32Array;
        dynamicDataUint32: Uint32Array;
        _updateID: number;
        /** Holds the indices of the geometry (quads) to draw. */
        indexBuffer: Buffer_2;
        /** The number of particles the buffer can hold. */
        private size;
        /** A list of the properties that are dynamic. */
        private dynamicProperties;
        /** A list of the properties that are static. */
        private staticProperties;
        /**
         * @param {object} properties - The properties to upload.
         * @param {boolean[]} dynamicPropertyFlags - Flags for which properties are dynamic.
         * @param {number} size - The size of the batch.
         */
        constructor(properties: IParticleRendererProperty[], dynamicPropertyFlags: boolean[], size: number);
        /** Sets up the renderer context and necessary buffers. */
        private initBuffers;
        /**
         * Uploads the dynamic properties.
         *
         * @param children - The children to upload.
         * @param startIndex - The index to start at.
         * @param amount - The number to upload.
         */
        uploadDynamic(children: DisplayObject[], startIndex: number, amount: number): void;
        /**
         * Uploads the static properties.
         *
         * @param children - The children to upload.
         * @param startIndex - The index to start at.
         * @param amount - The number to upload.
         */
        uploadStatic(children: DisplayObject[], startIndex: number, amount: number): void;
        /** Destroys the ParticleBuffer. */
        destroy(): void;
    }

    /**
     * The ParticleContainer class is a really fast version of the Container built solely for speed,
     * so use when you need a lot of sprites or particles.
     *
     * The tradeoff of the ParticleContainer is that most advanced functionality will not work.
     * ParticleContainer implements the basic object transform (position, scale, rotation)
     * and some advanced functionality like tint (as of v4.5.6).
     *
     * Other more advanced functionality like masking, children, filters, etc will not work on sprites in this batch.
     *
     * It's extremely easy to use:
     * ```js
     * let container = new ParticleContainer();
     *
     * for (let i = 0; i < 100; ++i)
     * {
     *     let sprite = PIXI.Sprite.from("myImage.png");
     *     container.addChild(sprite);
     * }
     * ```
     *
     * And here you have a hundred sprites that will be rendered at the speed of light.
     *
     * @memberof PIXI
     */
    export class ParticleContainer extends Container {
        /**
         * The blend mode to be applied to the sprite. Apply a value of `PIXI.BLEND_MODES.NORMAL`
         * to reset the blend mode.
         *
         * @default PIXI.BLEND_MODES.NORMAL
         */
        blendMode: BLEND_MODES;
        /**
         * If true, container allocates more batches in case there are more than `maxSize` particles.
         *
         * @default false
         */
        autoResize: boolean;
        /**
         * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
         * Advantages can include sharper image quality (like text) and faster rendering on canvas.
         * The main disadvantage is movement of objects may appear less smooth.
         * Default to true here as performance is usually the priority for particles.
         *
         * @default true
         */
        roundPixels: boolean;
        /**
         * The texture used to render the children.
         *
         * @readonly
         */
        baseTexture: BaseTexture;
        tintRgb: Float32Array;
        /** @private */
        _maxSize: number;
        /** @private */
        _buffers: ParticleBuffer[];
        /** @private */
        _batchSize: number;
        /**
         * Set properties to be dynamic (true) / static (false).
         *
         * @private
         */
        _properties: boolean[];
        /**
         * For every batch, stores _updateID corresponding to the last change in that batch.
         *
         * @private
         */
        _bufferUpdateIDs: number[];
        /**
         * When child inserted, removed or changes position this number goes up.
         *
         * @private
         */
        _updateID: number;
        /**
         * The tint applied to the container.
         * This is a hex value. A value of 0xFFFFFF will remove any tint effect.
         *
         * @default 0xFFFFFF
         */
        private _tint;
        /**
         * @param maxSize - The maximum number of particles that can be rendered by the container.
         *  Affects size of allocated buffers.
         * @param properties - The properties of children that should be uploaded to the gpu and applied.
         * @param {boolean} [properties.vertices=false] - When true, vertices be uploaded and applied.
         *                  if sprite's ` scale/anchor/trim/frame/orig` is dynamic, please set `true`.
         * @param {boolean} [properties.position=true] - When true, position be uploaded and applied.
         * @param {boolean} [properties.rotation=false] - When true, rotation be uploaded and applied.
         * @param {boolean} [properties.uvs=false] - When true, uvs be uploaded and applied.
         * @param {boolean} [properties.tint=false] - When true, alpha and tint be uploaded and applied.
         * @param {number} [batchSize=16384] - Number of particles per batch. If less than maxSize, it uses maxSize instead.
         * @param {boolean} [autoResize=false] - If true, container allocates more batches in case
         *  there are more than `maxSize` particles.
         */
        constructor(maxSize?: number, properties?: IParticleProperties, batchSize?: number, autoResize?: boolean);
        /**
         * Sets the private properties array to dynamic / static based on the passed properties object
         *
         * @param properties - The properties to be uploaded
         */
        setProperties(properties: IParticleProperties): void;
        updateTransform(): void;
        /**
         * The tint applied to the container. This is a hex value.
         * A value of 0xFFFFFF will remove any tint effect.
         * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
         *
         * @default 0xFFFFFF
         */
        get tint(): number;
        set tint(value: number);
        /**
         * Renders the container using the WebGL renderer.
         *
         * @param renderer - The WebGL renderer.
         */
        render(renderer: Renderer): void;
        /**
         * Set the flag that static data should be updated to true
         *
         * @param smallestChildIndex - The smallest child index.
         */
        protected onChildrenChange(smallestChildIndex: number): void;
        dispose(): void;
        /**
         * Destroys the container
         *
         * @param options - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have their
         *  destroy method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the texture of the child sprite
         * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
         *  Should it destroy the base texture of the child sprite
         */
        destroy(options?: IDestroyOptions | boolean): void;
    }

    /**
     * Renderer for Particles that is designer for speed over feature set.
     *
     * @memberof PIXI
     */
    export class ParticleRenderer extends ObjectRenderer {
        /** The WebGL state in which this renderer will work. */
        readonly state: State;
        /** The default shader that is used if a sprite doesn't have a more specific one. */
        shader: Shader;
        tempMatrix: Matrix;
        properties: IParticleRendererProperty[];
        /**
         * @param renderer - The renderer this sprite batch works for.
         */
        constructor(renderer: Renderer);
        /**
         * Renders the particle container object.
         *
         * @param container - The container to render using this ParticleRenderer.
         */
        render(container: ParticleContainer): void;
        /**
         * Creates one particle buffer for each child in the container we want to render and updates internal properties.
         *
         * @param container - The container to render using this ParticleRenderer
         * @return - The buffers
         */
        private generateBuffers;
        /**
         * Creates one more particle buffer, because container has autoResize feature.
         *
         * @param container - The container to render using this ParticleRenderer
         * @return - The generated buffer
         */
        private _generateOneMoreBuffer;
        /**
         * Uploads the vertices.
         *
         * @param children - the array of display objects to render
         * @param startIndex - the index to start from in the children array
         * @param amount - the amount of children that will have their vertices uploaded
         * @param array - The vertices to upload.
         * @param stride - Stride to use for iteration.
         * @param offset - Offset to start at.
         */
        uploadVertices(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
        /**
         * Uploads the position.
         *
         * @param children - the array of display objects to render
         * @param startIndex - the index to start from in the children array
         * @param amount - the amount of children that will have their positions uploaded
         * @param array - The vertices to upload.
         * @param stride - Stride to use for iteration.
         * @param offset - Offset to start at.
         */
        uploadPosition(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
        /**
         * Uploads the rotation.
         *
         * @param children - the array of display objects to render
         * @param startIndex - the index to start from in the children array
         * @param amount - the amount of children that will have their rotation uploaded
         * @param array - The vertices to upload.
         * @param stride - Stride to use for iteration.
         * @param offset - Offset to start at.
         */
        uploadRotation(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
        /**
         * Uploads the UVs.
         *
         * @param children - the array of display objects to render
         * @param startIndex - the index to start from in the children array
         * @param amount - the amount of children that will have their rotation uploaded
         * @param array - The vertices to upload.
         * @param stride - Stride to use for iteration.
         * @param offset - Offset to start at.
         */
        uploadUvs(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
        /**
         * Uploads the tint.
         *
         * @param children - the array of display objects to render
         * @param startIndex - the index to start from in the children array
         * @param amount - the amount of children that will have their rotation uploaded
         * @param array - The vertices to upload.
         * @param stride - Stride to use for iteration.
         * @param offset - Offset to start at.
         */
        uploadTint(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
        /** Destroys the ParticleRenderer. */
        destroy(): void;
    }

    /////////////////////////////////////////////////
    ////////////////polyfill//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /////////////////////////////////////////////////
    ////////////////prepare//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * The prepare manager provides functionality to upload content to the GPU.
     *
     * BasePrepare handles basic queuing functionality and is extended by
     * {@link PIXI.Prepare} and {@link PIXI.CanvasPrepare}
     * to provide preparation capabilities specific to their respective renderers.
     *
     * @example
     * // Create a sprite
     * const sprite = PIXI.Sprite.from('something.png');
     *
     * // Load object into GPU
     * app.renderer.plugins.prepare.upload(sprite, () => {
     *
     *     //Texture(s) has been uploaded to GPU
     *     app.stage.addChild(sprite);
     *
     * })
     *
     * @abstract
     * @memberof PIXI
     */
    export class BasePrepare {
        /**
         * The limiter to be used to control how quickly items are prepared.
         * @type {PIXI.CountLimiter|PIXI.TimeLimiter}
         */
        private limiter;
        /** Reference to the renderer. */
        protected renderer: AbstractRenderer;
        /**
         * The only real difference between CanvasPrepare and Prepare is what they pass
         * to upload hooks. That different parameter is stored here.
         */
        protected uploadHookHelper: any;
        /** Collection of items to uploads at once. */
        protected queue: Array<any>;
        /**
         * Collection of additional hooks for finding assets.
         * @type {Array<Function>}
         */
        addHooks: Array<any>;
        /**
         * Collection of additional hooks for processing assets.
         * @type {Array<Function>}
         */
        uploadHooks: Array<any>;
        /**
         * Callback to call after completed.
         * @type {Array<Function>}
         */
        completes: Array<any>;
        /**
         * If prepare is ticking (running).
         * @type {boolean}
         */
        ticking: boolean;
        /**
         * 'bound' call for prepareItems().
         * @type {Function}
         */
        private delayedTick;
        /**
         * @param {PIXI.AbstractRenderer} renderer - A reference to the current renderer
         */
        constructor(renderer: AbstractRenderer);
        /**
         * Upload all the textures and graphics to the GPU.
         *
         * @param {Function|PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text} item -
         *        Either the container or display object to search for items to upload, the items to upload themselves,
         *        or the callback function, if items have been added using `prepare.add`.
         * @param {Function} [done] - Optional callback when all queued uploads have completed
         */
        upload(item: IDisplayObjectExtended | Container | BaseTexture | Texture | (() => void), done?: () => void): void;
        /**
         * Handle tick update
         *
         * @private
         */
        tick(): void;
        /**
         * Actually prepare items. This is handled outside of the tick because it will take a while
         * and we do NOT want to block the current animation frame from rendering.
         *
         * @private
         */
        prepareItems(): void;
        /**
         * Adds hooks for finding items.
         *
         * @param {Function} addHook - Function call that takes two parameters: `item:*, queue:Array`
         *          function must return `true` if it was able to add item to the queue.
         * @return Instance of plugin for chaining.
         */
        registerFindHook(addHook: IFindHook): this;
        /**
         * Adds hooks for uploading items.
         *
         * @param {Function} uploadHook - Function call that takes two parameters: `prepare:CanvasPrepare, item:*` and
         *          function must return `true` if it was able to handle upload of item.
         * @return Instance of plugin for chaining.
         */
        registerUploadHook(uploadHook: IUploadHook): this;
        /**
         * Manually add an item to the uploading queue.
         *
         * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text|*} item - Object to
         *        add to the queue
         * @return Instance of plugin for chaining.
         */
        add(item: IDisplayObjectExtended | Container | BaseTexture | Texture): this;
        /** Destroys the plugin, don't use after this. */
        destroy(): void;
    }

    /**
     * CountLimiter limits the number of items handled by a {@link PIXI.BasePrepare} to a specified
     * number of items per frame.
     *
     * @memberof PIXI
     */
    export class CountLimiter {
        /** The maximum number of items that can be prepared each frame. */
        maxItemsPerFrame: number;
        /**
         * The number of items that can be prepared in the current frame. */
        itemsLeft: number;
        /**
         * @param maxItemsPerFrame - The maximum number of items that can be prepared each frame.
         */
        constructor(maxItemsPerFrame: number);
        /** Resets any counting properties to start fresh on a new frame. */
        beginFrame(): void;
        /**
         * Checks to see if another item can be uploaded. This should only be called once per item.
         *
         * @return If the item is allowed to be uploaded.
         */
        allowedToUpload(): boolean;
    }

    export interface IDisplayObjectExtended extends DisplayObject {
        _textures?: Array<Texture>;
        _texture?: Texture;
        style?: TextStyle | Partial<TextStyle>;
    }

    interface IFindHook {
        (item: any, queue: Array<any>): boolean;
    }

    interface IUploadHook {
        (helper: AbstractRenderer | BasePrepare, item: IDisplayObjectExtended): boolean;
    }

    /**
     * The prepare plugin provides renderer-specific plugins for pre-rendering DisplayObjects. These plugins are useful for
     * asynchronously preparing and uploading to the GPU assets, textures, graphics waiting to be displayed.
     *
     * Do not instantiate this plugin directly. It is available from the `renderer.plugins` property.
     * See {@link PIXI.CanvasRenderer#plugins} or {@link PIXI.Renderer#plugins}.
     * @example
     * // Create a new application
     * const app = new PIXI.Application();
     * document.body.appendChild(app.view);
     *
     * // Don't start rendering right away
     * app.stop();
     *
     * // create a display object
     * const rect = new PIXI.Graphics()
     *     .beginFill(0x00ff00)
     *     .drawRect(40, 40, 200, 200);
     *
     * // Add to the stage
     * app.stage.addChild(rect);
     *
     * // Don't start rendering until the graphic is uploaded to the GPU
     * app.renderer.plugins.prepare.upload(app.stage, () => {
     *     app.start();
     * });
     *
     *
     * @memberof PIXI
     */
    export class Prepare extends BasePrepare {
        /**
         * @param {PIXI.Renderer} renderer - A reference to the current renderer
         */
        constructor(renderer: Renderer);
    }

    /**
     * TimeLimiter limits the number of items handled by a {@link PIXI.BasePrepare} to a specified
     * number of milliseconds per frame.
     *
     * @memberof PIXI
     */
    export class TimeLimiter {
        /** The maximum milliseconds that can be spent preparing items each frame. */
        maxMilliseconds: number;
        /**
         * The start time of the current frame.
         *
         * @readonly
         */
        frameStart: number;
        /** @param maxMilliseconds - The maximum milliseconds that can be spent preparing items each frame. */
        constructor(maxMilliseconds: number);
        /** Resets any counting properties to start fresh on a new frame. */
        beginFrame(): void;
        /**
         * Checks to see if another item can be uploaded. This should only be called once per item.
         *
         * @return - If the item is allowed to be uploaded.
         */
        allowedToUpload(): boolean;
    }

    /////////////////////////////////////////////////
    ////////////////runner//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * A Runner is a highly performant and simple alternative to signals. Best used in situations
     * where events are dispatched to many objects at high frequency (say every frame!)
     *
     *
     * like a signal..
     * ```
     *
     * const myObject = {
     *     loaded: new Runner('loaded')
     * }
     *
     * const listener = {
     *     loaded: function(){
     *         // thin
     *     }
     * }
     *
     * myObject.loaded.add(listener);
     *
     * myObject.loaded.emit();
     * ```
     *
     * Or for handling calling the same function on many items
     * ```
     *
     * const myGame = {
     *     update: new Runner('update')
     * }
     *
     * const gameObject = {
     *     update: function(time){
     *         // update my gamey state
     *     }
     * }
     *
     * myGame.update.add(gameObject);
     *
     * myGame.update.emit(time);
     * ```
     *
     * @memberof PIXI
     */
    export class Runner {
        items: any[];
        private _name;
        private _aliasCount;
        /**
         * @param name - The function name that will be executed on the listeners added to this Runner.
         */
        constructor(name: string);
        /**
         * Dispatch/Broadcast Runner to all listeners added to the queue.
         *
         * @param {...any} params - (optional) parameters to pass to each listener
         */
        emit(a0?: unknown, a1?: unknown, a2?: unknown, a3?: unknown, a4?: unknown, a5?: unknown, a6?: unknown, a7?: unknown): this;
        private ensureNonAliasedItems;
        /**
         * Add a listener to the Runner
         *
         * Runners do not need to have scope or functions passed to them.
         * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
         * as the name provided to the Runner when it was created.
         *
         * Eg A listener passed to this Runner will require a 'complete' function.
         *
         * ```
         *
         * const complete = new Runner('complete');
         * ```
         *
         * The scope used will be the object itself.
         *
         * @param {any} item - The object that will be listening.
         */
        add(item: unknown): this;
        /**
         * Remove a single listener from the dispatch queue.
         *
         * @param {any} item - The listener that you would like to remove.
         */
        remove(item: unknown): this;
        /**
         * Check to see if the listener is already in the Runner
         *
         * @param {any} item - The listener that you would like to check.
         */
        contains(item: unknown): boolean;
        /** Remove all listeners from the Runner */
        removeAll(): this;
        /** Remove all references, don't use after this. */
        destroy(): void;
        /**
         * `true` if there are no this Runner contains no listeners
         *
         * @readonly
         */
        get empty(): boolean;
        /**
         * The name of the runner.
         *
         * @readonly
         */
        get name(): string;
    }

    /////////////////////////////////////////////////
    ////////////////settings//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    export interface IRenderOptions {
        view: HTMLCanvasElement;
        antialias: boolean;
        autoDensity: boolean;
        backgroundColor: number;
        backgroundAlpha: number;
        useContextAlpha: boolean | 'notMultiplied';
        clearBeforeRender: boolean;
        preserveDrawingBuffer: boolean;
        width: number;
        height: number;
        legacy: boolean;
    }

    export interface ISettings {
        MIPMAP_TEXTURES: MIPMAP_MODES;
        ANISOTROPIC_LEVEL: number;
        RESOLUTION: number;
        FILTER_RESOLUTION: number;
        FILTER_MULTISAMPLE: MSAA_QUALITY;
        SPRITE_MAX_TEXTURES: number;
        SPRITE_BATCH_SIZE: number;
        RENDER_OPTIONS: IRenderOptions;
        GC_MODE: GC_MODES;
        GC_MAX_IDLE: number;
        GC_MAX_CHECK_COUNT: number;
        WRAP_MODE: WRAP_MODES;
        SCALE_MODE: SCALE_MODES;
        PRECISION_VERTEX: PRECISION;
        PRECISION_FRAGMENT: PRECISION;
        CAN_UPLOAD_SAME_BUFFER: boolean;
        CREATE_IMAGE_BITMAP: boolean;
        ROUND_PIXELS: boolean;
        RETINA_PREFIX?: RegExp;
        FAIL_IF_MAJOR_PERFORMANCE_CAVEAT?: boolean;
        UPLOADS_PER_FRAME?: number;
        SORTABLE_CHILDREN?: boolean;
        PREFER_ENV?: ENV;
        STRICT_TEXTURE_CACHE?: boolean;
        MESH_CANVAS_PADDING?: number;
        TARGET_FPMS?: number;
    }

    export const isMobile: any;

    /**
     * User's customizable globals for overriding the default PIXI settings, such
     * as a renderer's default resolution, framerate, float precision, etc.
     * @example
     * // Use the native window resolution as the default resolution
     * // will support high-density displays when rendering
     * PIXI.settings.RESOLUTION = window.devicePixelRatio;
     *
     * // Disable interpolation when scaling, will make texture be pixelated
     * PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
     * @namespace PIXI.settings
     */
    export const settings: ISettings;

    /////////////////////////////////////////////////
    ////////////////sprite//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * The Sprite object is the base for all textured objects that are rendered to the screen
    *
     * A sprite can be created directly from an image like this:
     *
     * ```js
     * let sprite = PIXI.Sprite.from('assets/image.png');
     * ```
     *
     * The more efficient way to create sprites is using a {@link PIXI.Spritesheet},
     * as swapping base textures when rendering to the screen is inefficient.
     *
     * ```js
     * PIXI.Loader.shared.add("assets/spritesheet.json").load(setup);
     *
     * function setup() {
     *   let sheet = PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet;
     *   let sprite = new PIXI.Sprite(sheet.textures["image.png"]);
     *   ...
     * }
     * ```
     *
     * @memberof PIXI
     */
    export class Sprite extends Container {
        /**
         * The blend mode to be applied to the sprite. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
         *
         * @default PIXI.BLEND_MODES.NORMAL
         */
        blendMode: BLEND_MODES;
        indices: Uint16Array;
        /**
         * Plugin that is responsible for rendering this element.
         * Allows to customize the rendering process without overriding '_render' & '_renderCanvas' methods.
         *
         * @default 'batch'
         */
        pluginName: string;
        /**
         * The width of the sprite (this is initially set by the texture).
         *
         * @protected
         */
        _width: number;
        /**
         * The height of the sprite (this is initially set by the texture)
         *
         * @protected
         */
        _height: number;
        /**
         * The texture that the sprite is using.
         *
         * @private
         */
        _texture: Texture;
        _textureID: number;
        /**
         * Cached tint value so we can tell when the tint is changed.
         * Value is used for 2d CanvasRenderer.
         *
         * @protected
         * @default 0xFFFFFF
         */
        _cachedTint: number;
        protected _textureTrimmedID: number;
        /**
         * This is used to store the uvs data of the sprite, assigned at the same time
         * as the vertexData in calculateVertices().
         *
         * @member {Float32Array}
         */
        protected uvs: Float32Array;
        /**
         * The anchor point defines the normalized coordinates
         * in the texture that map to the position of this
         * sprite.
         *
         * By default, this is `(0,0)` (or `texture.defaultAnchor`
         * if you have modified that), which means the position
         * `(x,y)` of this `Sprite` will be the top-left corner.
         *
         * Note: Updating `texture.defaultAnchor` after
         * constructing a `Sprite` does _not_ update its anchor.
         *
         * {@link https://docs.cocos2d-x.org/cocos2d-x/en/sprites/manipulation.html}
         *
         * @default `this.texture.defaultAnchor`
         */
        protected _anchor: ObservablePoint;
        /**
         * This is used to store the vertex data of the sprite (basically a quad).
         *
         * @member {Float32Array}
         */
        protected vertexData: Float32Array;
        /**
         * This is used to calculate the bounds of the object IF it is a trimmed sprite.
         *
         * @member {Float32Array}
         */
        private vertexTrimmedData;
        /**
         * Internal roundPixels field
         *
         * @private
         */
        private _roundPixels;
        private _transformID;
        private _transformTrimmedID;
        /**
         * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
         *
         * @default 0xFFFFFF
         */
        private _tint;
        /**
         * The tint applied to the sprite. This is a RGB value. A value of 0xFFFFFF will remove any tint effect.
         *
         * @private
         * @default 16777215
         */
        _tintRGB: number;
        /** @param texture - The texture for this sprite. */
        constructor(texture?: Texture);
        /** When the texture is updated, this event will fire to update the scale and frame. */
        protected _onTextureUpdate(): void;
        /** Called when the anchor position updates. */
        private _onAnchorUpdate;
        /** Calculates worldTransform * vertices, store it in vertexData. */
        calculateVertices(): void;
        /**
         * Calculates worldTransform * vertices for a non texture with a trim. store it in vertexTrimmedData.
         *
         * This is used to ensure that the true width and height of a trimmed texture is respected.
         */
        calculateTrimmedVertices(): void;
        /**
         *
         * Renders the object using the WebGL renderer
         *
         * @param renderer - The webgl renderer to use.
         */
        protected _render(renderer: Renderer): void;
        /** Updates the bounds of the sprite. */
        protected _calculateBounds(): void;
        /**
         * Gets the local bounds of the sprite object.
         *
         * @param rect - Optional output rectangle.
         * @return The bounds.
         */
        getLocalBounds(rect?: Rectangle): Rectangle;
        /**
         * Tests if a point is inside this sprite
         *
         * @param point - the point to test
         * @return The result of the test
         */
        containsPoint(point: IPointData): boolean;
        /**
         * Destroys this sprite and optionally its texture and children.
         *
         * @param options - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param [options.children=false] - if set to true, all the children will have their destroy
         *      method called as well. 'options' will be passed on to those calls.
         * @param [options.texture=false] - Should it destroy the current texture of the sprite as well
         * @param [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
         */
        destroy(options?: IDestroyOptions | boolean): void;
        /**
         * Helper function that creates a new sprite based on the source you provide.
         * The source can be - frame id, image url, video url, canvas element, video element, base texture
         *
         * @param {string|PIXI.Texture|HTMLCanvasElement|HTMLVideoElement} source - Source to create texture from
         * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
         * @return The newly created sprite
         */
        static from(source: SpriteSource, options?: IBaseTextureOptions): Sprite;
        /**
         * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
         *
         * Advantages can include sharper image quality (like text) and faster rendering on canvas.
         * The main disadvantage is movement of objects may appear less smooth.
         *
         * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}.
         *
         * @default false
         */
        set roundPixels(value: boolean);
        get roundPixels(): boolean;
        /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
        get width(): number;
        set width(value: number);
        /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
        get height(): number;
        set height(value: number);
        /**
         * The anchor sets the origin point of the sprite. The default value is taken from the {@link PIXI.Texture|Texture}
         * and passed to the constructor.
         *
         * The default is `(0,0)`, this means the sprite's origin is the top left.
         *
         * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
         *
         * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
         *
         * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
         *
         * @example
         * const sprite = new PIXI.Sprite(texture);
         * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
         */
        get anchor(): ObservablePoint;
        set anchor(value: ObservablePoint);
        /**
         * The tint applied to the sprite. This is a hex value.
         *
         * A value of 0xFFFFFF will remove any tint effect.
         *
         * @default 0xFFFFFF
         */
        get tint(): number;
        set tint(value: number);
        /** The texture that the sprite is using. */
        get texture(): Texture;
        set texture(value: Texture);
    }

    export type SpriteSource = TextureSource | Texture;


    /////////////////////////////////////////////////
    ////////////////sprite-animated//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * An AnimatedSprite is a simple way to display an animation depicted by a list of textures.
     *
     * ```js
     * let alienImages = ["image_sequence_01.png","image_sequence_02.png","image_sequence_03.png","image_sequence_04.png"];
     * let textureArray = [];
     *
     * for (let i=0; i < 4; i++)
     * {
     *      let texture = PIXI.Texture.from(alienImages[i]);
     *      textureArray.push(texture);
     * };
     *
     * let animatedSprite = new PIXI.AnimatedSprite(textureArray);
     * ```
     *
     * The more efficient and simpler way to create an animated sprite is using a {@link PIXI.Spritesheet}
     * containing the animation definitions:
     *
     * ```js
     * PIXI.Loader.shared.add("assets/spritesheet.json").load(setup);
     *
     * function setup() {
     *   let sheet = PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet;
     *   animatedSprite = new PIXI.AnimatedSprite(sheet.animations["image_sequence"]);
     *   ...
     * }
     * ```
     *
     * @memberof PIXI
     */
    export class AnimatedSprite extends Sprite {
        /**
         * The speed that the AnimatedSprite will play at. Higher is faster, lower is slower.
         *
         * @default 1
         */
        animationSpeed: number;
        /**
         * Whether or not the animate sprite repeats after playing.
         *
         * @default true
         */
        loop: boolean;
        /**
         * Update anchor to [Texture's defaultAnchor]{@link PIXI.Texture#defaultAnchor} when frame changes.
         *
         * Useful with [sprite sheet animations]{@link PIXI.Spritesheet#animations} created with tools.
         * Changing anchor for each frame allows to pin sprite origin to certain moving feature
         * of the frame (e.g. left foot).
         *
         * Note: Enabling this will override any previously set `anchor` on each frame change.
         *
         * @default false
         */
        updateAnchor: boolean;
        /**
         * User-assigned function to call when an AnimatedSprite finishes playing.
         *
         * @example
         * animation.onComplete = function () {
         *   // finished!
         * };
         */
        onComplete?: () => void;
        /**
         * User-assigned function to call when an AnimatedSprite changes which texture is being rendered.
         *
         * @example
         * animation.onFrameChange = function () {
         *   // updated!
         * };
         */
        onFrameChange?: (currentFrame: number) => void;
        /**
         * User-assigned function to call when `loop` is true, and an AnimatedSprite is played and
         * loops around to start again.
         *
         * @example
         * animation.onLoop = function () {
         *   // looped!
         * };
         */
        onLoop?: () => void;
        private _playing;
        private _textures;
        private _durations;
        /**
         * `true` uses PIXI.Ticker.shared to auto update animation time.
         *
         * @default true
         */
        private _autoUpdate;
        /**
         * `true` if the instance is currently connected to PIXI.Ticker.shared to auto update animation time.
         *
         * @default false
         */
        private _isConnectedToTicker;
        /** Elapsed time since animation has been started, used internally to display current texture. */
        private _currentTime;
        /** The texture index that was displayed last time. */
        private _previousFrame;
        /**
         * @param textures - An array of {@link PIXI.Texture} or frame
         *  objects that make up the animation.
         * @param {boolean} [autoUpdate=true] - Whether to use PIXI.Ticker.shared to auto update animation time.
         */
        constructor(textures: Texture[] | FrameObject[], autoUpdate?: boolean);
        /** Stops the AnimatedSprite. */
        stop(): void;
        /** Plays the AnimatedSprite. */
        play(): void;
        /**
         * Stops the AnimatedSprite and goes to a specific frame.
         *
         * @param frameNumber - Frame index to stop at.
         */
        gotoAndStop(frameNumber: number): void;
        /**
         * Goes to a specific frame and begins playing the AnimatedSprite.
         *
         * @param frameNumber - Frame index to start at.
         */
        gotoAndPlay(frameNumber: number): void;
        /**
         * Updates the object transform for rendering.
         *
         * @param deltaTime - Time since last tick.
         */
        update(deltaTime: number): void;
        /** Updates the displayed texture to match the current frame index. */
        private updateTexture;
        /**
         * Stops the AnimatedSprite and destroys it.
         *
         * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
         *  have been set to that value.
         * @param {boolean} [options.children=false] - If set to true, all the children will have their destroy
         *      method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Should it destroy the current texture of the sprite as well.
         * @param {boolean} [options.baseTexture=false] - Should it destroy the base texture of the sprite as well.
         */
        destroy(options?: IDestroyOptions | boolean): void;
        /**
         * A short hand way of creating an AnimatedSprite from an array of frame ids.
         *
         * @param frames - The array of frames ids the AnimatedSprite will use as its texture frames.
         * @return - The new animated sprite with the specified frames.
         */
        static fromFrames(frames: string[]): AnimatedSprite;
        /**
         * A short hand way of creating an AnimatedSprite from an array of image ids.
         *
         * @param images - The array of image urls the AnimatedSprite will use as its texture frames.
         * @return The new animate sprite with the specified images as frames.
         */
        static fromImages(images: string[]): AnimatedSprite;
        /**
         * The total number of frames in the AnimatedSprite. This is the same as number of textures
         * assigned to the AnimatedSprite.
         *
         * @readonly
         * @default 0
         */
        get totalFrames(): number;
        /** The array of textures used for this AnimatedSprite. */
        get textures(): Texture[] | FrameObject[];
        set textures(value: Texture[] | FrameObject[]);
        /**
         * The AnimatedSprites current frame index.
         *
         * @readonly
         */
        get currentFrame(): number;
        /**
         * Indicates if the AnimatedSprite is currently playing.
         *
         * @readonly
         */
        get playing(): boolean;
        /** Whether to use PIXI.Ticker.shared to auto update animation time. */
        get autoUpdate(): boolean;
        set autoUpdate(value: boolean);
    }

    /** @memberof PIXI.AnimatedSprite */
    export interface FrameObject {
        /** The {@link PIXI.Texture} of the frame. */
        texture: Texture;
        /** The duration of the frame, in milliseconds. */
        time: number;
    }

    /////////////////////////////////////////////////
    ////////////////sprite-tiling//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    export interface TilingSprite extends GlobalMixins.TilingSprite {
    }

    /**
     * A tiling sprite is a fast way of rendering a tiling image.
     *
     * @memberof PIXI
     */
    export class TilingSprite extends Sprite {
        /** Tile transform */
        tileTransform: Transform;
        /** Matrix that is applied to UV to get the coords in Texture normalized space to coords in BaseTexture space. */
        uvMatrix: TextureMatrix;
        /**
         * Flags whether the tiling pattern should originate from the origin instead of the top-left corner in
         * local space.
         *
         * This will make the texture coordinates assigned to each vertex dependent on the value of the anchor. Without
         * this, the top-left corner always gets the (0, 0) texture coordinate.
         *
         * @default false
         */
        uvRespectAnchor: boolean;
        /**
         * @param texture - The texture of the tiling sprite.
         * @param width - The width of the tiling sprite.
         * @param height - The height of the tiling sprite.
         */
        constructor(texture: Texture, width?: number, height?: number);
        /**
         * Changes frame clamping in corresponding textureTransform, shortcut
         * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
         *
         * @default 0.5
         * @member {number}
         */
        get clampMargin(): number;
        set clampMargin(value: number);
        /** The scaling of the image that is being tiled. */
        get tileScale(): ObservablePoint;
        set tileScale(value: ObservablePoint);
        /** The offset of the image that is being tiled. */
        get tilePosition(): ObservablePoint;
        set tilePosition(value: ObservablePoint);
        /**
         * @protected
         */
        protected _onTextureUpdate(): void;
        /**
         * Renders the object using the WebGL renderer
         *
         * @param renderer - The renderer
         */
        protected _render(renderer: Renderer): void;
        /** Updates the bounds of the tiling sprite. */
        protected _calculateBounds(): void;
        /**
         * Gets the local bounds of the sprite object.
         *
         * @param rect - Optional output rectangle.
         * @return The bounds.
         */
        getLocalBounds(rect?: Rectangle): Rectangle;
        /**
         * Checks if a point is inside this tiling sprite.
         *
         * @param point - The point to check.
         * @return Whether or not the sprite contains the point.
         */
        containsPoint(point: IPointData): boolean;
        /**
         * Destroys this sprite and optionally its texture and children
         *
         * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
         *      method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Should it destroy the current texture of the sprite as well
         * @param {boolean} [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
         */
        destroy(options?: IDestroyOptions | boolean): void;
        /**
         * Helper function that creates a new tiling sprite based on the source you provide.
         * The source can be - frame id, image url, video url, canvas element, video element, base texture
         *
         * @static
         * @param {string|PIXI.Texture|HTMLCanvasElement|HTMLVideoElement} source - Source to create texture from
         * @param {Object} options - See {@link PIXI.BaseTexture}'s constructor for options.
         * @param {number} options.width - required width of the tiling sprite
         * @param {number} options.height - required height of the tiling sprite
         * @return {PIXI.TilingSprite} The newly created texture
         */
        static from(source: TextureSource, options: ISize & IBaseTextureOptions): TilingSprite;
        /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
        get width(): number;
        set width(value: number);
        /** The height of the TilingSprite, setting this will actually modify the scale to achieve the value set. */
        get height(): number;
        set height(value: number);
    }

    /**
     * WebGL renderer plugin for tiling sprites
     *
     * @class
     * @memberof PIXI
     * @extends PIXI.ObjectRenderer
     */
    export class TilingSpriteRenderer extends ObjectRenderer {
        shader: Shader;
        simpleShader: Shader;
        quad: QuadUv;
        readonly state: State;
        /**
         * constructor for renderer
         *
         * @param {PIXI.Renderer} renderer - The renderer this tiling awesomeness works for.
         */
        constructor(renderer: Renderer);
        /**
         * Creates shaders when context is initialized.
         */
        contextChange(): void;
        /**
         * @param {PIXI.TilingSprite} ts - tilingSprite to be rendered
         */
        render(ts: TilingSprite): void;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface TilingSprite {

        }
    }
    /////////////////////////////////////////////////
    ////////////////spritesheet//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * Atlas format.
     */
    export interface ISpritesheetData {
        frames: any;
        animations?: any;
        meta: {
            scale: string;
        };
    }

    /**
     * Represents the JSON data for a spritesheet atlas.
     */
    export interface ISpritesheetFrameData {
        frame: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        trimmed?: boolean;
        rotated?: boolean;
        sourceSize?: {
            w: number;
            h: number;
        };
        spriteSourceSize?: {
            x: number;
            y: number;
        };
        anchor?: IPointData;
    }

    /**
     * Utility class for maintaining reference to a collection
     * of Textures on a single Spritesheet.
     *
     * To access a sprite sheet from your code pass its JSON data file to Pixi's loader:
     *
     * ```js
     * PIXI.Loader.shared.add("images/spritesheet.json").load(setup);
     *
     * function setup() {
     *   let sheet = PIXI.Loader.shared.resources["images/spritesheet.json"].spritesheet;
     *   ...
     * }
     * ```
     * With the `sheet.textures` you can create Sprite objects,`sheet.animations` can be used to create an AnimatedSprite.
     *
     * Sprite sheets can be packed using tools like {@link https://codeandweb.com/texturepacker|TexturePacker},
     * {@link https://renderhjs.net/shoebox/|Shoebox} or {@link https://github.com/krzysztof-o/spritesheet.js|Spritesheet.js}.
     * Default anchor points (see {@link PIXI.Texture#defaultAnchor}) and grouping of animation sprites are currently only
     * supported by TexturePacker.
     *
     * @memberof PIXI
     */
    export class Spritesheet {
        /** The maximum number of Textures to build per process. */
        static readonly BATCH_SIZE = 1000;
        /** Reference to ths source texture. */
        baseTexture: BaseTexture;
        /**
         * A map containing all textures of the sprite sheet.
         * Can be used to create a {@link PIXI.Sprite|Sprite}:
         * ```js
         * new PIXI.Sprite(sheet.textures["image.png"]);
         * ```
         */
        textures: any;
        /**
         * A map containing the textures for each animation.
         * Can be used to create an {@link PIXI.AnimatedSprite|AnimatedSprite}:
         * ```js
         * new PIXI.AnimatedSprite(sheet.animations["anim_name"])
         * ```
         */
        animations: any;
        /**
         * Reference to the original JSON data.
         * @type {Object}
         */
        data: ISpritesheetData;
        /** The resolution of the spritesheet. */
        resolution: number;
        /**
         * Reference to original source image from the Loader. This reference is retained so we
         * can destroy the Texture later on. It is never used internally.
         */
        private _texture;
        /**
         * Map of spritesheet frames.
         * @type {Object}
         */
        private _frames;
        /** Collection of frame names. */
        private _frameKeys;
        /** Current batch index being processed. */
        private _batchIndex;
        /**
         * Callback when parse is completed.
         * @type {Function}
         */
        private _callback;
        /**
         * @param baseTexture - Reference to the source BaseTexture object.
         * @param {Object} data - Spritesheet image data.
         * @param resolutionFilename - The filename to consider when determining
         *        the resolution of the spritesheet. If not provided, the imageUrl will
         *        be used on the BaseTexture.
         */
        constructor(texture: BaseTexture | Texture, data: ISpritesheetData, resolutionFilename?: string);
        /**
         * Generate the resolution from the filename or fallback
         * to the meta.scale field of the JSON data.
         *
         * @param resolutionFilename - The filename to use for resolving
         *        the default resolution.
         * @return Resolution to use for spritesheet.
         */
        private _updateResolution;
        /**
         * Parser spritesheet from loaded data. This is done asynchronously
         * to prevent creating too many Texture within a single process.
         *
         * @param {Function} callback - Callback when complete returns
         *        a map of the Textures for this spritesheet.
         */
        parse(callback: (textures?: any) => void): void;
        /**
         * Process a batch of frames
         *
         * @param initialFrameIndex - The index of frame to start.
         */
        private _processFrames;
        /** Parse animations config. */
        private _processAnimations;
        /** The parse has completed. */
        private _parseComplete;
        /** Begin the next batch of textures. */
        private _nextBatch;
        /**
         * Destroy Spritesheet and don't use after this.
         *
         * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
         */
        destroy(destroyBase?: boolean): void;
    }

    /**
     * {@link PIXI.Loader} middleware for loading texture atlases that have been created with
     * TexturePacker or similar JSON-based spritesheet.
     *
     * This middleware automatically generates Texture resources.
     *
     * If you're using Webpack or other bundlers and plan on bundling the atlas' JSON,
     * use the {@link PIXI.Spritesheet} class to directly parse the JSON.
     *
     * The Loader's image Resource name is automatically appended with `"_image"`.
     * If a Resource with this name is already loaded, the Loader will skip parsing the
     * Spritesheet. The code below will generate an internal Loader Resource called `"myatlas_image"`.
     *
     * @example
     * loader.add('myatlas', 'path/to/myatlas.json');
     * loader.load(() => {
     *   loader.resources.myatlas; // atlas JSON resource
     *   loader.resources.myatlas_image; // atlas Image resource
     * });
     *
     * @memberof PIXI
     */
    export class SpritesheetLoader {
        /**
         * Called after a resource is loaded.
         *
         * @see PIXI.Loader.loaderMiddleware
         * @param resource
         * @param next
         */
        static use(resource: LoaderResource, next: (...args: unknown[]) => void): void;
        /**
         * Get the spritesheets root path
         *
         * @param resource - Resource to check path
         * @param baseUrl - Base root url
         */
        static getResourcePath(resource: LoaderResource, baseUrl: string): string;
    }


    /////////////////////////////////////////////////
    ////////////////text//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    export interface IFontMetrics {
        ascent: number;
        descent: number;
        fontSize: number;
    }

    export interface ITextStyle {
        align: TextStyleAlign;
        breakWords: boolean;
        dropShadow: boolean;
        dropShadowAlpha: number;
        dropShadowAngle: number;
        dropShadowBlur: number;
        dropShadowColor: string | number;
        dropShadowDistance: number;
        fill: TextStyleFill;
        fillGradientType: TEXT_GRADIENT;
        fillGradientStops: number[];
        fontFamily: string | string[];
        fontSize: number | string;
        fontStyle: TextStyleFontStyle;
        fontVariant: TextStyleFontVariant;
        fontWeight: TextStyleFontWeight;
        letterSpacing: number;
        lineHeight: number;
        lineJoin: TextStyleLineJoin;
        miterLimit: number;
        padding: number;
        stroke: string | number;
        strokeThickness: number;
        textBaseline: TextStyleTextBaseline;
        trim: boolean;
        whiteSpace: TextStyleWhiteSpace;
        wordWrap: boolean;
        wordWrapWidth: number;
        leading: number;
    }

    interface ModernContext2D extends CanvasRenderingContext2D {
        textLetterSpacing?: number;
        letterSpacing?: number;
    }

    /**
     * A Text Object will create a line or multiple lines of text.
     *
     * The text is created using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
     *
     * The primary advantage of this class over BitmapText is that you have great control over the style of the text,
     * which you can change at runtime.
     *
     * The primary disadvantages is that each piece of text has it's own texture, which can use more memory.
     * When text changes, this texture has to be re-generated and re-uploaded to the GPU, taking up time.
     *
     * To split a line you can use '\n' in your text string, or, on the `style` object,
     * change its `wordWrap` property to true and and give the `wordWrapWidth` property a value.
     *
     * A Text can be created directly from a string and a style object,
     * which can be generated [here](https://pixijs.io/pixi-text-style).
     *
     * ```js
     * let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
     * ```
     *
     * @memberof PIXI
     */
    class Text_2 extends Sprite {
        /**
         * New behavior for `lineHeight` that's meant to mimic HTML text. A value of `true` will
         * make sure the first baseline is offset by the `lineHeight` value if it is greater than `fontSize`.
         * A value of `false` will use the legacy behavior and not change the baseline of the first line.
         * In the next major release, we'll enable this by default.
         */
        static nextLineHeightBehavior: boolean;
        /** The canvas element that everything is drawn to. */
        canvas: HTMLCanvasElement;
        /** The canvas 2d context that everything is drawn with. */
        context: ModernContext2D;
        localStyleID: number;
        dirty: boolean;
        /**
         * The resolution / device pixel ratio of the canvas.
         *
         * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
         *
         * @default PIXI.settings.RESOLUTION
         */
        _resolution: number;
        _autoResolution: boolean;
        /**
         * Private tracker for the current text.
         *
         * @private
         */
        protected _text: string;
        /**
         * Private tracker for the current font.
         *
         * @private
         */
        protected _font: string;
        /**
         * Private tracker for the current style.
         *
         * @private
         */
        protected _style: TextStyle;
        /**
         * Private listener to track style changes.
         *
         * @private
         */
        protected _styleListener: () => void;
        /**
         * Keep track if this Text object created it's own canvas
         * element (`true`) or uses the constructor argument (`false`).
         * Used to workaround a GC issues with Safari < 13 when
         * destroying Text. See `destroy` for more info.
         */
        private _ownCanvas;
        /**
         * @param text - The string that you would like the text to display
         * @param {object|PIXI.TextStyle} [style] - The style parameters
         * @param canvas - The canvas element for drawing text
         */
        constructor(text: string, style?: Partial<ITextStyle> | TextStyle, canvas?: HTMLCanvasElement);
        /**
         * Renders text to its canvas, and updates its texture.
         *
         * By default this is used internally to ensure the texture is correct before rendering,
         * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
         * and then shared across multiple Sprites.
         *
         * @param respectDirty - Whether to abort updating the text if the Text isn't dirty and the function is called.
         */
        updateText(respectDirty: boolean): void;
        /**
         * Render the text with letter-spacing.
         *
         * @param text - The text to draw
         * @param x - Horizontal position to draw the text
         * @param y - Vertical position to draw the text
         * @param isStroke - Is this drawing for the outside stroke of the
         *  text? If not, it's for the inside fill
         */
        private drawLetterSpacing;
        /** Updates texture size based on canvas size. */
        private updateTexture;
        /**
         * Renders the object using the WebGL renderer
         *
         * @param renderer - The renderer
         */
        protected _render(renderer: Renderer): void;
        /**
         * Gets the local bounds of the text object.
         *
         * @param rect - The output rectangle.
         * @return The bounds.
         */
        getLocalBounds(rect: Rectangle): Rectangle;
        /** Calculates the bounds of the Text as a rectangle. The bounds calculation takes the worldTransform into account. */
        protected _calculateBounds(): void;
        /**
         * Generates the fill style. Can automatically generate a gradient based on the fill style being an array
         *
         * @param style - The style.
         * @param lines - The lines of text.
         * @return The fill style
         */
        private _generateFillStyle;
        /**
         * Destroys this text object.
         *
         * Note* Unlike a Sprite, a Text object will automatically destroy its baseTexture and texture as
         * the majority of the time the texture will not be shared with any other Sprites.
         *
         * @param options - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have their
         *  destroy method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=true] - Should it destroy the current texture of the sprite as well
         * @param {boolean} [options.baseTexture=true] - Should it destroy the base texture of the sprite as well
         */
        destroy(options?: IDestroyOptions | boolean): void;
        /** The width of the Text, setting this will actually modify the scale to achieve the value set. */
        get width(): number;
        set width(value: number);
        /** The height of the Text, setting this will actually modify the scale to achieve the value set. */
        get height(): number;
        set height(value: number);
        /**
         * Set the style of the text.
         *
         * Set up an event listener to listen for changes on the style object and mark the text as dirty.
         */
        get style(): TextStyle | Partial<ITextStyle>;
        set style(style: TextStyle | Partial<ITextStyle>);
        /** Set the copy for the text object. To split a line you can use '\n'. */
        get text(): string;
        set text(text: string);
        /**
         * The resolution / device pixel ratio of the canvas.
         *
         * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
         *
         * @default 1
         */
        get resolution(): number;
        set resolution(value: number);
    }
    export { Text_2 as Text }

    /**
     * Constants that define the type of gradient on text.
     *
     * @static
     * @constant
     * @name TEXT_GRADIENT
     * @memberof PIXI
     * @type {object}
     * @property {number} LINEAR_VERTICAL Vertical gradient
     * @property {number} LINEAR_HORIZONTAL Linear gradient
     */
    export enum TEXT_GRADIENT {
        LINEAR_VERTICAL = 0,
        LINEAR_HORIZONTAL = 1
    }

    /**
     * The TextMetrics object represents the measurement of a block of text with a specified style.
     *
     * ```js
     * let style = new PIXI.TextStyle({fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
     * let textMetrics = PIXI.TextMetrics.measureText('Your text', style)
     * ```
     *
     * @memberof PIXI
     */
    class TextMetrics_2 {
        /** The text that was measured. */
        text: string;
        /** The style that was measured. */
        style: TextStyle;
        /** The measured width of the text. */
        width: number;
        /** The measured height of the text. */
        height: number;
        /** An array of lines of the text broken by new lines and wrapping is specified in style. */
        lines: string[];
        /** An array of the line widths for each line matched to `lines`. */
        lineWidths: number[];
        /** The measured line height for this style. */
        lineHeight: number;
        /** The maximum line width for all measured lines. */
        maxLineWidth: number;
        /**
         * The font properties object from TextMetrics.measureFont.
         *
         * @type {PIXI.IFontMetrics}
         */
        fontProperties: IFontMetrics;
        static METRICS_STRING: string;
        static BASELINE_SYMBOL: string;
        static BASELINE_MULTIPLIER: number;
        static HEIGHT_MULTIPLIER: number;
        static _canvas: HTMLCanvasElement | any;
        static _context: CanvasRenderingContext2D | any;
        static _fonts: {
            [font: string]: IFontMetrics;
        };
        static _newlines: number[];
        static _breakingSpaces: number[];
        /**
         * @param text - the text that was measured
         * @param style - the style that was measured
         * @param width - the measured width of the text
         * @param height - the measured height of the text
         * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
         * @param lineWidths - an array of the line widths for each line matched to `lines`
         * @param lineHeight - the measured line height for this style
         * @param maxLineWidth - the maximum line width for all measured lines
         * @param {PIXI.IFontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
         */
        constructor(text: string, style: TextStyle, width: number, height: number, lines: string[], lineWidths: number[], lineHeight: number, maxLineWidth: number, fontProperties: IFontMetrics);
        /**
         * Measures the supplied string of text and returns a Rectangle.
         *
         * @param text - The text to measure.
         * @param style - The text style to use for measuring
         * @param wordWrap - Override for if word-wrap should be applied to the text.
         * @param canvas - optional specification of the canvas to use for measuring.
         * @return Measured width and height of the text.
         */
        static measureText(text: string, style: TextStyle, wordWrap?: boolean, canvas?: HTMLCanvasElement | any): TextMetrics_2;
        /**
         * Applies newlines to a string to have it optimally fit into the horizontal
         * bounds set by the Text object's wordWrapWidth property.
         *
         * @param text - String to apply word wrapping to
         * @param style - the style to use when wrapping
         * @param canvas - optional specification of the canvas to use for measuring.
         * @return New string with new lines applied where required
         */
        private static wordWrap;
        /**
         * Convienience function for logging each line added during the wordWrap method.
         *
         * @param line    - The line of text to add
         * @param newLine - Add new line character to end
         * @return A formatted line
         */
        private static addLine;
        /**
         * Gets & sets the widths of calculated characters in a cache object
         *
         * @param key            - The key
         * @param letterSpacing  - The letter spacing
         * @param cache          - The cache
         * @param context        - The canvas context
         * @return The from cache.
         */
        private static getFromCache;
        /**
         * Determines whether we should collapse breaking spaces.
         *
         * @param whiteSpace - The TextStyle property whiteSpace
         * @return Should collapse
         */
        private static collapseSpaces;
        /**
         * Determines whether we should collapse newLine chars.
         *
         * @param whiteSpace - The white space
         * @return  should collapse
         */
        private static collapseNewlines;
        /**
         * Trims breaking whitespaces from string.
         *
         * @param  text - The text
         * @return Trimmed string
         */
        private static trimRight;
        /**
         * Determines if char is a newline.
         *
         * @param  char - The character
         * @return True if newline, False otherwise.
         */
        private static isNewline;
        /**
         * Determines if char is a breaking whitespace.
         *
         * It allows one to determine whether char should be a breaking whitespace
         * For example certain characters in CJK langs or numbers.
         * It must return a boolean.
         *
         * @param char     - The character
         * @param [nextChar] - The next character
         * @return True if whitespace, False otherwise.
         */
        static isBreakingSpace(char: string, _nextChar?: string): boolean;
        /**
         * Splits a string into words, breaking-spaces and newLine characters
         *
         * @param  text - The text
         * @return  A tokenized array
         */
        private static tokenize;
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It allows one to customise which words should break
         * Examples are if the token is CJK or numbers.
         * It must return a boolean.
         *
         * @param  token       - The token
         * @param  breakWords - The style attr break words
         * @return Whether to break word or not
         */
        static canBreakWords(_token: string, breakWords: boolean): boolean;
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It allows one to determine whether a pair of characters
         * should be broken by newlines
         * For example certain characters in CJK langs or numbers.
         * It must return a boolean.
         *
         * @param  char        - The character
         * @param  nextChar    - The next character
         * @param  token       - The token/word the characters are from
         * @param  index       - The index in the token of the char
         * @param  breakWords - The style attr break words
         * @return whether to break word or not
         */
        static canBreakChars(_char: string, _nextChar: string, _token: string, _index: number, _breakWords: boolean): boolean;
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It is called when a token (usually a word) has to be split into separate pieces
         * in order to determine the point to break a word.
         * It must return an array of characters.
         *
         * @example
         * // Correctly splits emojis, eg "🤪🤪" will result in two element array, each with one emoji.
         * TextMetrics.wordWrapSplit = (token) => [...token];
         *
         * @param  token - The token to split
         * @return The characters of the token
         */
        static wordWrapSplit(token: string): string[];
        /**
         * Calculates the ascent, descent and fontSize of a given font-style
         *
         * @param font - String representing the style of the font
         * @return Font properties object
         */
        static measureFont(font: string): IFontMetrics;
        /**
         * Clear font metrics in metrics cache.
         *
         * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
         */
        static clearMetrics(font?: string): void;
    }
    export { TextMetrics_2 as TextMetrics }

    /**
     * A TextStyle Object contains information to decorate a Text objects.
     *
     * An instance can be shared between multiple Text objects; then changing the style will update all text objects using it.
     *
     * A tool can be used to generate a text style [here](https://pixijs.io/pixi-text-style).
     *
     * @memberof PIXI
     */
    export class TextStyle implements ITextStyle {
        styleID: number;
        protected _align: TextStyleAlign;
        protected _breakWords: boolean;
        protected _dropShadow: boolean;
        protected _dropShadowAlpha: number;
        protected _dropShadowAngle: number;
        protected _dropShadowBlur: number;
        protected _dropShadowColor: string | number;
        protected _dropShadowDistance: number;
        protected _fill: TextStyleFill;
        protected _fillGradientType: TEXT_GRADIENT;
        protected _fillGradientStops: number[];
        protected _fontFamily: string | string[];
        protected _fontSize: number | string;
        protected _fontStyle: TextStyleFontStyle;
        protected _fontVariant: TextStyleFontVariant;
        protected _fontWeight: TextStyleFontWeight;
        protected _letterSpacing: number;
        protected _lineHeight: number;
        protected _lineJoin: TextStyleLineJoin;
        protected _miterLimit: number;
        protected _padding: number;
        protected _stroke: string | number;
        protected _strokeThickness: number;
        protected _textBaseline: TextStyleTextBaseline;
        protected _trim: boolean;
        protected _whiteSpace: TextStyleWhiteSpace;
        protected _wordWrap: boolean;
        protected _wordWrapWidth: number;
        protected _leading: number;
        /**
         * @param {object} [style] - The style parameters
         * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center' or 'right'),
         *  does not affect single line text
         * @param {boolean} [style.breakWords=false] - Indicates if lines can be wrapped within words, it
         *  needs wordWrap to be set to true
         * @param {boolean} [style.dropShadow=false] - Set a drop shadow for the text
         * @param {number} [style.dropShadowAlpha=1] - Set alpha for the drop shadow
         * @param {number} [style.dropShadowAngle=Math.PI/6] - Set a angle of the drop shadow
         * @param {number} [style.dropShadowBlur=0] - Set a shadow blur radius
         * @param {string|number} [style.dropShadowColor='black'] - A fill style to be used on the dropshadow e.g 'red', '#00FF00'
         * @param {number} [style.dropShadowDistance=5] - Set a distance of the drop shadow
         * @param {string|string[]|number|number[]|CanvasGradient|CanvasPattern} [style.fill='black'] - A canvas
         *  fillstyle that will be used on the text e.g 'red', '#00FF00'. Can be an array to create a gradient
         *  eg ['#000000','#FFFFFF']
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
         * @param {number} [style.fillGradientType=PIXI.TEXT_GRADIENT.LINEAR_VERTICAL] - If fill is an array of colours
         *  to create a gradient, this can change the type/direction of the gradient. See {@link PIXI.TEXT_GRADIENT}
         * @param {number[]} [style.fillGradientStops] - If fill is an array of colours to create a gradient, this array can set
         * the stop points (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
         * @param {string|string[]} [style.fontFamily='Arial'] - The font family
         * @param {number|string} [style.fontSize=26] - The font size (as a number it converts to px, but as a string,
         *  equivalents are '26px','20pt','160%' or '1.6em')
         * @param {string} [style.fontStyle='normal'] - The font style ('normal', 'italic' or 'oblique')
         * @param {string} [style.fontVariant='normal'] - The font variant ('normal' or 'small-caps')
         * @param {string} [style.fontWeight='normal'] - The font weight ('normal', 'bold', 'bolder', 'lighter' and '100',
         *  '200', '300', '400', '500', '600', '700', '800' or '900')
         * @param {number} [style.leading=0] - The space between lines
         * @param {number} [style.letterSpacing=0] - The amount of spacing between letters, default is 0
         * @param {number} [style.lineHeight] - The line height, a number that represents the vertical space that a letter uses
         * @param {string} [style.lineJoin='miter'] - The lineJoin property sets the type of corner created, it can resolve
         *      spiked text issues. Possible values "miter" (creates a sharp corner), "round" (creates a round corner) or "bevel"
         *      (creates a squared corner).
         * @param {number} [style.miterLimit=10] - The miter limit to use when using the 'miter' lineJoin mode. This can reduce
         *      or increase the spikiness of rendered text.
         * @param {number} [style.padding=0] - Occasionally some fonts are cropped. Adding some padding will prevent this from
         *     happening by adding padding to all sides of the text.
         * @param {string|number} [style.stroke='black'] - A canvas fillstyle that will be used on the text stroke
         *  e.g 'blue', '#FCFF00'
         * @param {number} [style.strokeThickness=0] - A number that represents the thickness of the stroke.
         *  Default is 0 (no stroke)
         * @param {boolean} [style.trim=false] - Trim transparent borders
         * @param {string} [style.textBaseline='alphabetic'] - The baseline of the text that is rendered.
         * @param {string} [style.whiteSpace='pre'] - Determines whether newlines & spaces are collapsed or preserved "normal"
         *      (collapse, collapse), "pre" (preserve, preserve) | "pre-line" (preserve, collapse). It needs wordWrap to be set to true
         * @param {boolean} [style.wordWrap=false] - Indicates if word wrap should be used
         * @param {number} [style.wordWrapWidth=100] - The width at which text will wrap, it needs wordWrap to be set to true
         */
        constructor(style?: Partial<ITextStyle>);
        /**
         * Creates a new TextStyle object with the same values as this one.
         * Note that the only the properties of the object are cloned.
         *
         * @return New cloned TextStyle object
         */
        clone(): TextStyle;
        /** Resets all properties to the defaults specified in TextStyle.prototype._default */
        reset(): void;
        /**
         * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
         *
         * @member {string}
         */
        get align(): TextStyleAlign;
        set align(align: TextStyleAlign);
        /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
        get breakWords(): boolean;
        set breakWords(breakWords: boolean);
        /** Set a drop shadow for the text. */
        get dropShadow(): boolean;
        set dropShadow(dropShadow: boolean);
        /** Set alpha for the drop shadow. */
        get dropShadowAlpha(): number;
        set dropShadowAlpha(dropShadowAlpha: number);
        /** Set a angle of the drop shadow. */
        get dropShadowAngle(): number;
        set dropShadowAngle(dropShadowAngle: number);
        /** Set a shadow blur radius. */
        get dropShadowBlur(): number;
        set dropShadowBlur(dropShadowBlur: number);
        /** A fill style to be used on the dropshadow e.g 'red', '#00FF00'. */
        get dropShadowColor(): number | string;
        set dropShadowColor(dropShadowColor: number | string);
        /** Set a distance of the drop shadow. */
        get dropShadowDistance(): number;
        set dropShadowDistance(dropShadowDistance: number);
        /**
         * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
         *
         * Can be an array to create a gradient eg ['#000000','#FFFFFF']
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
         *
         * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
         */
        get fill(): TextStyleFill;
        set fill(fill: TextStyleFill);
        /**
         * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
         *
         * @see PIXI.TEXT_GRADIENT
         */
        get fillGradientType(): TEXT_GRADIENT;
        set fillGradientType(fillGradientType: TEXT_GRADIENT);
        /**
         * If fill is an array of colours to create a gradient, this array can set the stop points
         * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
         */
        get fillGradientStops(): number[];
        set fillGradientStops(fillGradientStops: number[]);
        /** The font family. */
        get fontFamily(): string | string[];
        set fontFamily(fontFamily: string | string[]);
        /**
         * The font size
         * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
         */
        get fontSize(): number | string;
        set fontSize(fontSize: number | string);
        /**
         * The font style
         * ('normal', 'italic' or 'oblique')
         *
         * @member {string}
         */
        get fontStyle(): TextStyleFontStyle;
        set fontStyle(fontStyle: TextStyleFontStyle);
        /**
         * The font variant
         * ('normal' or 'small-caps')
         *
         * @member {string}
         */
        get fontVariant(): TextStyleFontVariant;
        set fontVariant(fontVariant: TextStyleFontVariant);
        /**
         * The font weight
         * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
         *
         * @member {string}
         */
        get fontWeight(): TextStyleFontWeight;
        set fontWeight(fontWeight: TextStyleFontWeight);
        /** The amount of spacing between letters, default is 0. */
        get letterSpacing(): number;
        set letterSpacing(letterSpacing: number);
        /** The line height, a number that represents the vertical space that a letter uses. */
        get lineHeight(): number;
        set lineHeight(lineHeight: number);
        /** The space between lines. */
        get leading(): number;
        set leading(leading: number);
        /**
         * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
         * Default is 'miter' (creates a sharp corner).
         *
         * @member {string}
         */
        get lineJoin(): TextStyleLineJoin;
        set lineJoin(lineJoin: TextStyleLineJoin);
        /**
         * The miter limit to use when using the 'miter' lineJoin mode.
         *
         * This can reduce or increase the spikiness of rendered text.
         */
        get miterLimit(): number;
        set miterLimit(miterLimit: number);
        /**
         * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
         * by adding padding to all sides of the text.
         */
        get padding(): number;
        set padding(padding: number);
        /**
         * A canvas fillstyle that will be used on the text stroke
         * e.g 'blue', '#FCFF00'
         */
        get stroke(): string | number;
        set stroke(stroke: string | number);
        /**
         * A number that represents the thickness of the stroke.
         *
         * @default 0
         */
        get strokeThickness(): number;
        set strokeThickness(strokeThickness: number);
        /**
         * The baseline of the text that is rendered.
         *
         * @member {string}
         */
        get textBaseline(): TextStyleTextBaseline;
        set textBaseline(textBaseline: TextStyleTextBaseline);
        /** Trim transparent borders. */
        get trim(): boolean;
        set trim(trim: boolean);
        /**
         * How newlines and spaces should be handled.
         * Default is 'pre' (preserve, preserve).
         *
         *  value       | New lines     |   Spaces
         *  ---         | ---           |   ---
         * 'normal'     | Collapse      |   Collapse
         * 'pre'        | Preserve      |   Preserve
         * 'pre-line'   | Preserve      |   Collapse
         *
         * @member {string}
         */
        get whiteSpace(): TextStyleWhiteSpace;
        set whiteSpace(whiteSpace: TextStyleWhiteSpace);
        /** Indicates if word wrap should be used. */
        get wordWrap(): boolean;
        set wordWrap(wordWrap: boolean);
        /** The width at which text will wrap, it needs wordWrap to be set to true. */
        get wordWrapWidth(): number;
        set wordWrapWidth(wordWrapWidth: number);
        /**
         * Generates a font style string to use for `TextMetrics.measureFont()`.
         *
         * @return Font style string, for passing to `TextMetrics.measureFont()`
         */
        toFontString(): string;
    }

    export type TextStyleAlign = 'left' | 'center' | 'right' | 'justify';

    export type TextStyleFill = string | string[] | number | number[] | CanvasGradient | CanvasPattern;

    export type TextStyleFontStyle = 'normal' | 'italic' | 'oblique';

    export type TextStyleFontVariant = 'normal' | 'small-caps';

    export type TextStyleFontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

    export type TextStyleLineJoin = 'miter' | 'round' | 'bevel';

    export type TextStyleTextBaseline = 'alphabetic' | 'top' | 'hanging' | 'middle' | 'ideographic' | 'bottom';

    export type TextStyleWhiteSpace = 'normal' | 'pre' | 'pre-line';

    /////////////////////////////////////////////////
    ////////////////text-bitmap//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * BitmapFont represents a typeface available for use with the BitmapText class. Use the `install`
     * method for adding a font to be used.
     *
     * @memberof PIXI
     */
    export class BitmapFont {
        /**
         * This character set includes all the letters in the alphabet (both lower- and upper- case).
         *
         * @type {string[][]}
         * @example
         * BitmapFont.from("ExampleFont", style, { chars: BitmapFont.ALPHA })
         */
        static readonly ALPHA: (string | string[])[];
        /**
         * This character set includes all decimal digits (from 0 to 9).
         *
         * @type {string[][]}
         * @example
         * BitmapFont.from("ExampleFont", style, { chars: BitmapFont.NUMERIC })
         */
        static readonly NUMERIC: string[][];
        /**
         * This character set is the union of `BitmapFont.ALPHA` and `BitmapFont.NUMERIC`.
         *
         * @type {string[][]}
         */
        static readonly ALPHANUMERIC: (string | string[])[];
        /**
         * This character set consists of all the ASCII table.
         *
         * @member {string[][]}
         * @see http://www.asciitable.com/
         */
        static readonly ASCII: string[][];
        /**
         * Collection of default options when using `BitmapFont.from`.
         *
         * @property {number} resolution=1
         * @property {number} textureWidth=512
         * @property {number} textureHeight=512
         * @property {number} padding=4
         * @property {string|string[]|string[][]} chars = PIXI.BitmapFont.ALPHANUMERIC
         */
        static readonly defaultOptions: IBitmapFontOptions;
        /** Collection of available/installed fonts. */
        static readonly available: any;
        /** The name of the font face. */
        readonly font: string;
        /** The size of the font face in pixels. */
        readonly size: number;
        /** The line-height of the font face in pixels. */
        readonly lineHeight: number;
        /** The map of characters by character code. */
        readonly chars: any;
        /** The map of base page textures (i.e., sheets of glyphs). */
        readonly pageTextures: any;
        /** The range of the distance field in pixels. */
        readonly distanceFieldRange: number;
        /** The kind of distance field for this font or "none". */
        readonly distanceFieldType: string;
        private _ownsTextures;
        /**
         * @param data
         * @param textures
         * @param ownsTextures - Setting to `true` will destroy page textures
         *        when the font is uninstalled.
         */
        constructor(data: BitmapFontData, textures: Texture[] | any, ownsTextures?: boolean);
        /** Remove references to created glyph textures. */
        destroy(): void;
        /**
         * Register a new bitmap font.
         *
         * @param data - The
         *        characters map that could be provided as xml or raw string.
         * @param textures - List of textures for each page.
         * @param ownsTextures - Set to `true` to destroy page textures
         *        when the font is uninstalled. By default fonts created with
         *        `BitmapFont.from` or from the `BitmapFontLoader` are `true`.
         * @return {PIXI.BitmapFont} Result font object with font, size, lineHeight
         *         and char fields.
         */
        static install(data: string | XMLDocument | BitmapFontData, textures: Texture | Texture[] | any, ownsTextures?: boolean): BitmapFont;
        /**
         * Remove bitmap font by name.
         *
         * @param name - Name of the font to uninstall.
         */
        static uninstall(name: string): void;
        /**
         * Generates a bitmap-font for the given style and character set. This does not support
         * kernings yet. With `style` properties, only the following non-layout properties are used:
         *
         * - {@link PIXI.TextStyle#dropShadow|dropShadow}
         * - {@link PIXI.TextStyle#dropShadowDistance|dropShadowDistance}
         * - {@link PIXI.TextStyle#dropShadowColor|dropShadowColor}
         * - {@link PIXI.TextStyle#dropShadowBlur|dropShadowBlur}
         * - {@link PIXI.TextStyle#dropShadowAngle|dropShadowAngle}
         * - {@link PIXI.TextStyle#fill|fill}
         * - {@link PIXI.TextStyle#fillGradientStops|fillGradientStops}
         * - {@link PIXI.TextStyle#fillGradientType|fillGradientType}
         * - {@link PIXI.TextStyle#fontFamily|fontFamily}
         * - {@link PIXI.TextStyle#fontSize|fontSize}
         * - {@link PIXI.TextStyle#fontVariant|fontVariant}
         * - {@link PIXI.TextStyle#fontWeight|fontWeight}
         * - {@link PIXI.TextStyle#lineJoin|lineJoin}
         * - {@link PIXI.TextStyle#miterLimit|miterLimit}
         * - {@link PIXI.TextStyle#stroke|stroke}
         * - {@link PIXI.TextStyle#strokeThickness|strokeThickness}
         * - {@link PIXI.TextStyle#textBaseline|textBaseline}
         *
         * @param name - The name of the custom font to use with BitmapText.
         * @param style - Style options to render with BitmapFont.
         * @param options - Setup options for font or name of the font.
         * @param {string|string[]|string[][]} [options.chars=PIXI.BitmapFont.ALPHANUMERIC] - characters included
         *      in the font set. You can also use ranges. For example, `[['a', 'z'], ['A', 'Z'], "!@#$%^&*()~{}[] "]`.
         *      Don't forget to include spaces ' ' in your character set!
         * @param {number} [options.resolution=1] - Render resolution for glyphs.
         * @param {number} [options.textureWidth=512] - Optional width of atlas, smaller values to reduce memory.
         * @param {number} [options.textureHeight=512] - Optional height of atlas, smaller values to reduce memory.
         * @param {number} [options.padding=4] - Padding between glyphs on texture atlas.
         * @return Font generated by style options.
         * @example
         * PIXI.BitmapFont.from("TitleFont", {
         *     fontFamily: "Arial",
         *     fontSize: 12,
         *     strokeThickness: 2,
         *     fill: "purple"
         * });
         *
         * const title = new PIXI.BitmapText("This is the title", { fontName: "TitleFont" });
         */
        static from(name: string, textStyle?: TextStyle | Partial<ITextStyle>, options?: IBitmapFontOptions): BitmapFont;
    }

    /**
     * Normalized parsed data from .fnt files.
     *
     * @memberof PIXI
     */
    export class BitmapFontData {
        /** @readonly */
        info: IBitmapFontDataInfo[];
        /** @readonly */
        common: IBitmapFontDataCommon[];
        /** @readonly */
        page: IBitmapFontDataPage[];
        /** @readonly */
        char: IBitmapFontDataChar[];
        /** @readonly */
        kerning: IBitmapFontDataKerning[];
        /** @readonly */
        distanceField: IBitmapFontDataDistanceField[];
        constructor();
    }

    /**
     * {@link PIXI.Loader Loader} middleware for loading
     * bitmap-based fonts suitable for using with {@link PIXI.BitmapText}.
     *
     * @memberof PIXI
     */
    export class BitmapFontLoader {
        /**
         * Called when the plugin is installed.
         *
         * @see PIXI.Loader.registerPlugin
         */
        static add(): void;
        /**
         * Called after a resource is loaded.
         *
         * @see PIXI.Loader.loaderMiddleware
         * @param {PIXI.LoaderResource} resource
         * @param {function} next
         */
        static use(this: Loader, resource: LoaderResource, next: (...args: any[]) => void): void;
        /** Get folder path from a resource. */
        private static getBaseUrl;
        /**
         * Replacement for NodeJS's path.dirname
         *
         * @param {string} url - Path to get directory for
         */
        private static dirname;
    }

    /**
     * A BitmapText object will create a line or multiple lines of text using bitmap font.
     *
     * The primary advantage of this class over Text is that all of your textures are pre-generated and loading,
     * meaning that rendering is fast, and changing text has no performance implications.
     *
     * Supporting character sets other than latin, such as CJK languages, may be impractical due to the number of characters.
     *
     * To split a line you can use '\n', '\r' or '\r\n' in your string.
     *
     * PixiJS can auto-generate fonts on-the-fly using BitmapFont or use fnt files provided by:
     * http://www.angelcode.com/products/bmfont/ for Windows or
     * http://www.bmglyph.com/ for Mac.
     *
     * You can also use SDF, MSDF and MTSDF BitmapFonts for vector-like scaling appearance provided by:
     * https://github.com/soimy/msdf-bmfont-xml for SDF and MSDF fnt files or
     * https://github.com/Chlumsky/msdf-atlas-gen for SDF, MSDF and MTSDF json files
     *
     * A BitmapText can only be created when the font is loaded.
     *
     * ```js
     * // in this case the font is in a file called 'desyrel.fnt'
     * let bitmapText = new PIXI.BitmapText("text using a fancy font!", {
     *   fontName: "Desyrel",
     *   fontSize: 35,
     *   align: "right"
     * });
     * ```
     *
     * @memberof PIXI
     */
    export class BitmapText extends Container {
        static styleDefaults: Partial<IBitmapTextStyle>;
        /** Set to `true` if the BitmapText needs to be redrawn. */
        dirty: boolean;
        /**
         * Private tracker for the width of the overall text.
         *
         * @private
         */
        protected _textWidth: number;
        /**
         * Private tracker for the height of the overall text.
         *
         * @private
         */
        protected _textHeight: number;
        /**
         * Private tracker for the current text.
         *
         * @private
         */
        protected _text: string;
        /**
         * The max width of this bitmap text in pixels. If the text provided is longer than the
         * value provided, line breaks will be automatically inserted in the last whitespace.
         * Disable by setting value to 0
         *
         * @private
         */
        protected _maxWidth: number;
        /**
         * The max line height. This is useful when trying to use the total height of the Text,
         * ie: when trying to vertically align. (Internally used)
         *
         * @private
         */
        protected _maxLineHeight: number;
        /**
         * Letter spacing. This is useful for setting the space between characters.
         *
         * @private
         */
        protected _letterSpacing: number;
        /**
         * Text anchor.
         *
         * @readonly
         * @private
         */
        protected _anchor: ObservablePoint;
        /**
         * Private tracker for the current font name.
         *
         * @private
         */
        protected _fontName: string;
        /**
         * Private tracker for the current font size.
         *
         * @private
         */
        protected _fontSize: number;
        /**
         * Private tracker for the current text align.
         *
         * @type {string}
         * @private
         */
        protected _align: TextStyleAlign;
        /** Collection of page mesh data. */
        protected _activePagesMeshData: PageMeshData[];
        /**
         * Private tracker for the current tint.
         *
         * @private
         */
        protected _tint: number;
        /**
         * If true PixiJS will Math.floor() x/y values when rendering.
         *
         * @default PIXI.settings.ROUND_PIXELS
         */
        protected _roundPixels: boolean;
        /** Cached char texture is destroyed when BitmapText is destroyed. */
        private _textureCache;
        /**
         * @param text - A string that you would like the text to display.
         * @param style - The style parameters.
         * @param {string} style.fontName - The installed BitmapFont name.
         * @param {number} [style.fontSize] - The size of the font in pixels, e.g. 24. If undefined,
         *.     this will default to the BitmapFont size.
         * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center', 'right' or 'justify'),
         *      does not affect single line text.
         * @param {number} [style.tint=0xFFFFFF] - The tint color.
         * @param {number} [style.letterSpacing=0] - The amount of spacing between letters.
         * @param {number} [style.maxWidth=0] - The max width of the text before line wrapping.
         */
        constructor(text: string, style?: Partial<IBitmapTextStyle>);
        /**
         * Renders text and updates it when needed. This should only be called
         * if the BitmapFont is regenerated.
         */
        updateText(): void;
        updateTransform(): void;
        _render(renderer: Renderer): void;
        /**
         * Validates text before calling parent's getLocalBounds
         *
         * @return - The rectangular bounding area
         */
        getLocalBounds(): Rectangle;
        /**
         * Updates text when needed
         *
         * @private
         */
        protected validate(): void;
        /**
         * The tint of the BitmapText object.
         *
         * @default 0xffffff
         */
        get tint(): number;
        set tint(value: number);
        /**
         * The alignment of the BitmapText object.
         *
         * @member {string}
         * @default 'left'
         */
        get align(): TextStyleAlign;
        set align(value: TextStyleAlign);
        /** The name of the BitmapFont. */
        get fontName(): string;
        set fontName(value: string);
        /** The size of the font to display. */
        get fontSize(): number;
        set fontSize(value: number);
        /**
         * The anchor sets the origin point of the text.
         *
         * The default is `(0,0)`, this means the text's origin is the top left.
         *
         * Setting the anchor to `(0.5,0.5)` means the text's origin is centered.
         *
         * Setting the anchor to `(1,1)` would mean the text's origin point will be the bottom right corner.
         */
        get anchor(): ObservablePoint;
        set anchor(value: ObservablePoint);
        /** The text of the BitmapText object. */
        get text(): string;
        set text(text: string);
        /**
         * The max width of this bitmap text in pixels. If the text provided is longer than the
         * value provided, line breaks will be automatically inserted in the last whitespace.
         * Disable by setting the value to 0.
         */
        get maxWidth(): number;
        set maxWidth(value: number);
        /**
         * The max line height. This is useful when trying to use the total height of the Text,
         * i.e. when trying to vertically align.
         *
         * @readonly
         */
        get maxLineHeight(): number;
        /**
         * The width of the overall text, different from fontSize,
         * which is defined in the style object.
         *
         * @readonly
         */
        get textWidth(): number;
        /** Additional space between characters. */
        get letterSpacing(): number;
        set letterSpacing(value: number);
        /**
         * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
         * Advantages can include sharper image quality (like text) and faster rendering on canvas.
         * The main disadvantage is movement of objects may appear less smooth.
         * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
         *
         * @default PIXI.settings.ROUND_PIXELS
         */
        get roundPixels(): boolean;
        set roundPixels(value: boolean);
        /**
         * The height of the overall text, different from fontSize,
         * which is defined in the style object.
         *
         * @readonly
         */
        get textHeight(): number;
        destroy(options?: boolean | IDestroyOptions): void;
    }

    export interface IBitmapFontCharacter {
        xOffset: number;
        yOffset: number;
        xAdvance: number;
        texture: Texture;
        page: number;
        kerning: any;
    }

    /** @memberof PIXI */
    export interface IBitmapFontDataChar {
        /** Unique id of character */
        id: number;
        /** {@link PIXI.IBitmapFontDataPage} id */
        page: number;
        /** x-position of character in page. */
        x: number;
        /** y-position of character in page. */
        y: number;
        /** Width of character in page. */
        width: number;
        /** Height of character in page. */
        height: number;
        /** x-offset to apply when rendering character */
        xoffset: number;
        /** y-offset to apply when rendering character. */
        yoffset: number;
        /** Advancement to apply to next character. */
        xadvance: number;
    }

    /** @memberof PIXI */
    export interface IBitmapFontDataCommon {
        /** Line height, in pixels. */
        lineHeight: number;
    }

    /** @memberof PIXI */
    export interface IBitmapFontDataDistanceField {
        /** Type of distance field */
        fieldType: string;
        /** Range of distance */
        distanceRange: number;
    }

    /** @memberof PIXI */
    export interface IBitmapFontDataInfo {
        /** Font face */
        face: string;
        /** Font size */
        size: number;
    }

    /** @memberof PIXI */
    export interface IBitmapFontDataKerning {
        /** First character of pair */
        first: number;
        /** Second character of pair */
        second: number;
        /** x-offset to apply between first & second characters when they are next to each other. */
        amount: number;
    }

    /** @memberof PIXI */
    export interface IBitmapFontDataPage {
        /** Unique id for bitmap texture */
        id: number;
        /** File name */
        file: string;
    }

    /** @memberof PIXI */
    export interface IBitmapFontOptions {
        /**
         * The character set to generate.
         * @default PIXI.BitmapFont.ALPHANUMERIC
         */
        chars?: string | (string | string[])[];
        /**
         * The resolution for rendering.
         * @default 1
         */
        resolution?: number;
        /**
         * The padding between glyphs in the atlas.
         * @default 4
         */
        padding?: number;
        /**
         * The width of the texture atlas.
         * @default 512
         */
        textureWidth?: number;
        /**
         * The height of the texture atlas.
         * @default 512
         */
        textureHeight?: number;
    }

    export interface IBitmapTextFontDescriptor {
        name: string;
        size: number;
    }

    export interface IBitmapTextStyle {
        fontName: string;
        fontSize: number;
        tint: number;
        align: TextStyleAlign;
        letterSpacing: number;
        maxWidth: number;
    }

    interface PageMeshData {
        index: number;
        indexCount: number;
        vertexCount: number;
        uvsCount: number;
        total: number;
        mesh: Mesh;
        vertices?: Float32Array;
        uvs?: Float32Array;
        indices?: Uint16Array;
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        interface IBitmapFontResource {
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface LoaderResource extends Partial<IBitmapFontResource> {

        }

        interface IBitmapFontResourceMetadata {
            pageFile: string;
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface IResourceMetadata extends Partial<IBitmapFontResourceMetadata> {

        }
    }
    /////////////////////////////////////////////////
    ////////////////ticker//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts
    /// <reference path="./global.d.ts" />


    /**
     * A Ticker class that runs an update loop that other objects listen to.
     *
     * This class is composed around listeners meant for execution on the next requested animation frame.
     * Animation frames are requested only when necessary, e.g. When the ticker is started and the emitter has listeners.
     *
     * @class
     * @memberof PIXI
     */
    export class Ticker {
        /** The private shared ticker instance */
        private static _shared;
        /** The private system ticker instance  */
        private static _system;
        /**
         * Whether or not this ticker should invoke the method
         * {@link PIXI.Ticker#start} automatically
         * when a listener is added.
         */
        autoStart: boolean;
        /**
         * Scalar time value from last frame to this frame.
         * This value is capped by setting {@link PIXI.Ticker#minFPS}
         * and is scaled with {@link PIXI.Ticker#speed}.
         * **Note:** The cap may be exceeded by scaling.
         */
        deltaTime: number;
        /**
         * Scaler time elapsed in milliseconds from last frame to this frame.
         * This value is capped by setting {@link PIXI.Ticker#minFPS}
         * and is scaled with {@link PIXI.Ticker#speed}.
         * **Note:** The cap may be exceeded by scaling.
         * If the platform supports DOMHighResTimeStamp,
         * this value will have a precision of 1 µs.
         * Defaults to target frame time
         * @default 16.66
         */
        deltaMS: number;
        /**
         * Time elapsed in milliseconds from last frame to this frame.
         * Opposed to what the scalar {@link PIXI.Ticker#deltaTime}
         * is based, this value is neither capped nor scaled.
         * If the platform supports DOMHighResTimeStamp,
         * this value will have a precision of 1 µs.
         * Defaults to target frame time
         * @default 16.66
         */
        elapsedMS: number;
        /**
         * The last time {@link PIXI.Ticker#update} was invoked.
         * This value is also reset internally outside of invoking
         * update, but only when a new animation frame is requested.
         * If the platform supports DOMHighResTimeStamp,
         * this value will have a precision of 1 µs.
         */
        lastTime: number;
        /**
         * Factor of current {@link PIXI.Ticker#deltaTime}.
         * @example
         * // Scales ticker.deltaTime to what would be
         * // the equivalent of approximately 120 FPS
         * ticker.speed = 2;
         */
        speed: number;
        /**
         * Whether or not this ticker has been started.
         * `true` if {@link PIXI.Ticker#start} has been called.
         * `false` if {@link PIXI.Ticker#stop} has been called.
         * While `false`, this value may change to `true` in the
         * event of {@link PIXI.Ticker#autoStart} being `true`
         * and a listener is added.
         */
        started: boolean;
        /** The first listener. All new listeners added are chained on this. */
        private _head;
        /** Internal current frame request ID */
        private _requestId;
        /**
         * Internal value managed by minFPS property setter and getter.
         * This is the maximum allowed milliseconds between updates.
         */
        private _maxElapsedMS;
        /**
         * Internal value managed by minFPS property setter and getter.
         * This is the minimum allowed milliseconds between updates.
         */
        private _minElapsedMS;
        /** If enabled, deleting is disabled.*/
        private _protected;
        /**
         * The last time keyframe was executed.
         * Maintains a relatively fixed interval with the previous value.
         */
        private _lastFrame;
        /**
         * Internal tick method bound to ticker instance.
         * This is because in early 2015, Function.bind
         * is still 60% slower in high performance scenarios.
         * Also separating frame requests from update method
         * so listeners may be called at any time and with
         * any animation API, just invoke ticker.update(time).
         *
         * @param time - Time since last tick.
         */
        private _tick;
        constructor();
        /**
         * Conditionally requests a new animation frame.
         * If a frame has not already been requested, and if the internal
         * emitter has listeners, a new frame is requested.
         *
         * @private
         */
        private _requestIfNeeded;
        /**
         * Conditionally cancels a pending animation frame.
         * @private
         */
        private _cancelIfNeeded;
        /**
         * Conditionally requests a new animation frame.
         * If the ticker has been started it checks if a frame has not already
         * been requested, and if the internal emitter has listeners. If these
         * conditions are met, a new frame is requested. If the ticker has not
         * been started, but autoStart is `true`, then the ticker starts now,
         * and continues with the previous conditions to request a new frame.
         *
         * @private
         */
        private _startIfPossible;
        /**
         * Register a handler for tick events. Calls continuously unless
         * it is removed or the ticker is stopped.
         *
         * @param fn - The listener function to be added for updates
         * @param context - The listener context
         * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
         * @returns This instance of a ticker
         */
        add<T = any>(fn: TickerCallback<T>, context?: T, priority?: UPDATE_PRIORITY): this;
        /**
         * Add a handler for the tick event which is only execute once.
         *
         * @param fn - The listener function to be added for one update
         * @param context - The listener context
         * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
         * @returns This instance of a ticker
         */
        addOnce<T = any>(fn: TickerCallback<T>, context?: T, priority?: UPDATE_PRIORITY): this;
        /**
         * Internally adds the event handler so that it can be sorted by priority.
         * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
         * before the rendering.
         *
         * @private
         * @param listener - Current listener being added.
         * @returns This instance of a ticker
         */
        private _addListener;
        /**
         * Removes any handlers matching the function and context parameters.
         * If no handlers are left after removing, then it cancels the animation frame.
         *
         * @param fn - The listener function to be removed
         * @param context - The listener context to be removed
         * @returns This instance of a ticker
         */
        remove<T = any>(fn: TickerCallback<T>, context?: T): this;
        /**
         * The number of listeners on this ticker, calculated by walking through linked list
         *
         * @readonly
         * @member {number}
         */
        get count(): number;
        /**
         * Starts the ticker. If the ticker has listeners
         * a new animation frame is requested at this point.
         */
        start(): void;
        /**
         * Stops the ticker. If the ticker has requested
         * an animation frame it is canceled at this point.
         */
        stop(): void;
        /**
         * Destroy the ticker and don't use after this. Calling
         * this method removes all references to internal events.
         */
        destroy(): void;
        /**
         * Triggers an update. An update entails setting the
         * current {@link PIXI.Ticker#elapsedMS},
         * the current {@link PIXI.Ticker#deltaTime},
         * invoking all listeners with current deltaTime,
         * and then finally setting {@link PIXI.Ticker#lastTime}
         * with the value of currentTime that was provided.
         * This method will be called automatically by animation
         * frame callbacks if the ticker instance has been started
         * and listeners are added.
         *
         * @param {number} [currentTime=performance.now()] - the current time of execution
         */
        update(currentTime?: number): void;
        /**
         * The frames per second at which this ticker is running.
         * The default is approximately 60 in most modern browsers.
         * **Note:** This does not factor in the value of
         * {@link PIXI.Ticker#speed}, which is specific
         * to scaling {@link PIXI.Ticker#deltaTime}.
         *
         * @member {number}
         * @readonly
         */
        get FPS(): number;
        /**
         * Manages the maximum amount of milliseconds allowed to
         * elapse between invoking {@link PIXI.Ticker#update}.
         * This value is used to cap {@link PIXI.Ticker#deltaTime},
         * but does not effect the measured value of {@link PIXI.Ticker#FPS}.
         * When setting this property it is clamped to a value between
         * `0` and `PIXI.settings.TARGET_FPMS * 1000`.
         *
         * @member {number}
         * @default 10
         */
        get minFPS(): number;
        set minFPS(fps: number);
        /**
         * Manages the minimum amount of milliseconds required to
         * elapse between invoking {@link PIXI.Ticker#update}.
         * This will effect the measured value of {@link PIXI.Ticker#FPS}.
         * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
         * Otherwise it will be at least `minFPS`
         *
         * @member {number}
         * @default 0
         */
        get maxFPS(): number;
        set maxFPS(fps: number);
        /**
         * The shared ticker instance used by {@link PIXI.AnimatedSprite} and by
         * {@link PIXI.VideoResource} to update animation frames / video textures.
         *
         * It may also be used by {@link PIXI.Application} if created with the `sharedTicker` option property set to true.
         *
         * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
         * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
         *
         * @example
         * let ticker = PIXI.Ticker.shared;
         * // Set this to prevent starting this ticker when listeners are added.
         * // By default this is true only for the PIXI.Ticker.shared instance.
         * ticker.autoStart = false;
         * // FYI, call this to ensure the ticker is stopped. It should be stopped
         * // if you have not attempted to render anything yet.
         * ticker.stop();
         * // Call this when you are ready for a running shared ticker.
         * ticker.start();
         *
         * @example
         * // You may use the shared ticker to render...
         * let renderer = PIXI.autoDetectRenderer();
         * let stage = new PIXI.Container();
         * document.body.appendChild(renderer.view);
         * ticker.add(function (time) {
         *     renderer.render(stage);
         * });
         *
         * @example
         * // Or you can just update it manually.
         * ticker.autoStart = false;
         * ticker.stop();
         * function animate(time) {
         *     ticker.update(time);
         *     renderer.render(stage);
         *     requestAnimationFrame(animate);
         * }
         * animate(performance.now());
         *
         * @member {PIXI.Ticker}
         * @static
         */
        static get shared(): Ticker;
        /**
         * The system ticker instance used by {@link PIXI.InteractionManager} and by
         * {@link PIXI.BasePrepare} for core timing functionality that shouldn't usually need to be paused,
         * unlike the `shared` ticker which drives visual animations and rendering which may want to be paused.
         *
         * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
         *
         * @member {PIXI.Ticker}
         * @static
         */
        static get system(): Ticker;
    }

    export type TickerCallback<T> = (this: T, dt: number) => any;

    /**
     * Middleware for for Application Ticker.
     *
     * @example
     * Application.registerPlugin(TickerPlugin);
     *
     * @class
     * @memberof PIXI
     */
    export class TickerPlugin {
        static start: () => void;
        static stop: () => void;
        static _ticker: Ticker;
        static ticker: Ticker;
        /**
         * Initialize the plugin with scope of application instance
         *
         * @static
         * @private
         * @param {object} [options] - See application options
         */
        static init(options?: GlobalMixins.IApplicationOptions): void;
        /**
         * Clean up the ticker, scoped to application.
         *
         * @static
         * @private
         */
        static destroy(): void;
    }

    /**
     * Represents the update priorities used by internal PIXI classes when registered with
     * the {@link PIXI.Ticker} object. Higher priority items are updated first and lower
     * priority items, such as render, should go later.
     *
     * @static
     * @constant
     * @name UPDATE_PRIORITY
     * @memberof PIXI
     * @enum {number}
     * @property {number} INTERACTION=50 Highest priority, used for {@link PIXI.InteractionManager}
     * @property {number} HIGH=25 High priority updating, {@link PIXI.VideoBaseTexture} and {@link PIXI.AnimatedSprite}
     * @property {number} NORMAL=0 Default priority for ticker events, see {@link PIXI.Ticker#add}.
     * @property {number} LOW=-25 Low priority used for {@link PIXI.Application} rendering.
     * @property {number} UTILITY=-50 Lowest priority used for {@link PIXI.BasePrepare} utility.
     */
    export enum UPDATE_PRIORITY {
        INTERACTION = 50,
        HIGH = 25,
        NORMAL = 0,
        LOW = -25,
        UTILITY = -50
    }

    //------------ global.d.ts
    namespace GlobalMixins {
        interface Application {
            stop(): void;
            start(): void;
        }

        interface IApplicationOptions {
            autoStart?: boolean;
            sharedTicker?: boolean;
        }
    }

}


declare namespace PIXI.utils {
    /////////////////////////////////////////////////
    ////////////////utils//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    export type ArrayFixed<T, L extends number> = [T, Array<T>] & {
        length: L;
    };

    /**
     * @todo Describe property usage
     *
     * @static
     * @name BaseTextureCache
     * @memberof PIXI.utils
     * @type {Object}
     */
    export const BaseTextureCache: {
        [key: string]: BaseTexture;
    };

    /**
     * Creates a Canvas element of the given size to be used as a target for rendering to.
     *
     * @class
     * @memberof PIXI.utils
     */
    export class CanvasRenderTarget {
        /** The Canvas object that belongs to this CanvasRenderTarget. */
        canvas: HTMLCanvasElement;
        /** A CanvasRenderingContext2D object representing a two-dimensional rendering context. */
        context: CanvasRenderingContext2D;
        /**
         * The resolution / device pixel ratio of the canvas
         * @default 1
         */
        resolution: number;
        /**
         * @param width - the width for the newly created canvas
         * @param height - the height for the newly created canvas
         * @param {number} [resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the canvas
         */
        constructor(width: number, height: number, resolution?: number);
        /**
         * Clears the canvas that was created by the CanvasRenderTarget class.
         *
         * @private
         */
        clear(): void;
        /**
         * Resizes the canvas to the specified width and height.
         *
         * @param desiredWidth - the desired width of the canvas
         * @param desiredHeight - the desired height of the canvas
         */
        resize(desiredWidth: number, desiredHeight: number): void;
        /** Destroys this canvas. */
        destroy(): void;
        /**
         * The width of the canvas buffer in pixels.
         *
         * @member {number}
         */
        get width(): number;
        set width(val: number);
        /**
         * The height of the canvas buffer in pixels.
         *
         * @member {number}
         */
        get height(): number;
        set height(val: number);
    }

    /**
     * Removes all textures from cache, but does not destroy them
     *
     * @memberof PIXI.utils
     * @function clearTextureCache
     */
    export function clearTextureCache(): void;

    /**
     * changes blendMode according to texture format
     *
     * @memberof PIXI.utils
     * @function correctBlendMode
     * @param {number} blendMode - supposed blend mode
     * @param {boolean} premultiplied - whether source is premultiplied
     * @returns {number} true blend mode for this texture
     */
    export function correctBlendMode(blendMode: number, premultiplied: boolean): number;

    /**
     * Generic Mask Stack data structure
     *
     * @memberof PIXI.utils
     * @function createIndicesForQuads
     * @param {number} size - Number of quads
     * @param {Uint16Array|Uint32Array} [outBuffer] - Buffer for output, length has to be `6 * size`
     * @return {Uint16Array|Uint32Array} - Resulting index buffer
     */
    export function createIndicesForQuads(size: number, outBuffer?: Uint16Array | Uint32Array): Uint16Array | Uint32Array;

    /**
     * Regexp for data URI.
     * Based on: {@link https://github.com/ragingwind/data-uri-regex}
     *
     * @static
     * @constant {RegExp|string} DATA_URI
     * @memberof PIXI
     * @example data:image/png;base64
     */
    export const DATA_URI: RegExp;

    /**
     * @memberof PIXI.utils
     * @interface DecomposedDataUri
     */
    /**
     * type, eg. `image`
     * @memberof PIXI.utils.DecomposedDataUri#
     * @member {string} mediaType
     */
    /**
     * Sub type, eg. `png`
     * @memberof PIXI.utils.DecomposedDataUri#
     * @member {string} subType
     */
    /**
     * @memberof PIXI.utils.DecomposedDataUri#
     * @member {string} charset
     */
    /**
     * Data encoding, eg. `base64`
     * @memberof PIXI.utils.DecomposedDataUri#
     * @member {string} encoding
     */
    /**
     * The actual data
     * @memberof PIXI.utils.DecomposedDataUri#
     * @member {string} data
     */
    /**
     * Split a data URI into components. Returns undefined if
     * parameter `dataUri` is not a valid data URI.
     *
     * @memberof PIXI.utils
     * @function decomposeDataUri
     * @param {string} dataUri - the data URI to check
     * @return {PIXI.utils.DecomposedDataUri|undefined} The decomposed data uri or undefined
     */
    export function decomposeDataUri(dataUri: string): DecomposedDataUri;

    export interface DecomposedDataUri {
        mediaType: string;
        subType: string;
        charset: string;
        encoding: string;
        data: string;
    }

    /**
     * Helper for warning developers about deprecated features & settings.
     * A stack track for warnings is given; useful for tracking-down where
     * deprecated methods/properties/classes are being used within the code.
     *
     * @memberof PIXI.utils
     * @function deprecation
     * @param {string} version - The version where the feature became deprecated
     * @param {string} message - Message should include what is deprecated, where, and the new solution
     * @param {number} [ignoreDepth=3] - The number of steps to ignore at the top of the error stack
     *        this is mostly to ignore internal deprecation calls.
     */
    export function deprecation(version: string, message: string, ignoreDepth?: number): void;

    /**
     * Destroys all texture in the cache
     *
     * @memberof PIXI.utils
     * @function destroyTextureCache
     */
    export function destroyTextureCache(): void;

    /**
     * Sets the `crossOrigin` property for this resource based on if the url
     * for this resource is cross-origin. If crossOrigin was manually set, this
     * function does nothing.
     * Nipped from the resource loader!
     *
     * @ignore
     * @param {string} url - The url to test.
     * @param {object} [loc=window.location] - The location object to test against.
     * @return {string} The crossOrigin value to use (or empty string for none).
     */
    export function determineCrossOrigin(url: string, loc?: Location): string;

    export type Dict<T> = {
        [key: string]: T;
    };


    type FormatFunction = {
        (URL: URL, options?: URLFormatOptions): string;
        (urlObject: UrlObject | string): string;
    };

    export function getBufferType(array: ITypedArray): 'Float32Array' | 'Uint32Array' | 'Int32Array' | 'Uint16Array' | 'Uint8Array' | null;

    /**
     * get the resolution / device pixel ratio of an asset by looking for the prefix
     * used by spritesheets and image urls
     *
     * @memberof PIXI.utils
     * @function getResolutionOfUrl
     * @param {string} url - the image path
     * @param {number} [defaultValue=1] - the defaultValue if no filename prefix is set.
     * @return {number} resolution / device pixel ratio of an asset
     */
    export function getResolutionOfUrl(url: string, defaultValue?: number): number;

    /**
     * Converts a hexadecimal color number to an [R, G, B] array of normalized floats (numbers from 0.0 to 1.0).
     *
     * @example
     * PIXI.utils.hex2rgb(0xffffff); // returns [1, 1, 1]
     * @memberof PIXI.utils
     * @function hex2rgb
     * @param {number} hex - The hexadecimal number to convert
     * @param  {number[]} [out=[]] - If supplied, this array will be used rather than returning a new one
     * @return {number[]} An array representing the [R, G, B] of the color where all values are floats.
     */
    export function hex2rgb(hex: number, out?: Array<number> | Float32Array): Array<number> | Float32Array;

    /**
     * Converts a hexadecimal color number to a string.
     *
     * @example
     * PIXI.utils.hex2string(0xffffff); // returns "#ffffff"
     * @memberof PIXI.utils
     * @function hex2string
     * @param {number} hex - Number in hex (e.g., `0xffffff`)
     * @return {string} The string color (e.g., `"#ffffff"`).
     */
    export function hex2string(hex: number): string;

    export function interleaveTypedArrays(arrays: PackedArray[], sizes: number[]): Float32Array;
    export { isMobile }

    /**
     * Checks if a number is a power of two.
     *
     * @function isPow2
     * @memberof PIXI.utils
     * @param {number} v - input value
     * @return {boolean} `true` if value is power of two
     */
    export function isPow2(v: number): boolean;

    /**
     * Helper for checking for WebGL support.
     *
     * @memberof PIXI.utils
     * @function isWebGLSupported
     * @return {boolean} Is WebGL supported.
     */
    export function isWebGLSupported(): boolean;

    /**
     * Computes ceil of log base 2
     *
     * @function log2
     * @memberof PIXI.utils
     * @param {number} v - input value
     * @return {number} logarithm base 2
     */
    export function log2(v: number): number;

    /**
     * Rounds to next power of two.
     *
     * @function nextPow2
     * @memberof PIXI.utils
     * @param {number} v - input value
     * @return {number}
     */
    export function nextPow2(v: number): number;

    type PackedArray = Float32Array | Uint32Array | Int32Array | Uint8Array;

    /**
     * This file contains redeclared types for Node `url` and `querystring` modules. These modules
     * don't provide their own typings but instead are a part of the full Node typings. The purpose of
     * this file is to redeclare the required types to avoid having the whole Node types as a
     * dependency.
     */
    interface ParsedUrlQuery {
        [key: string]: string | string[];
    }

    interface ParsedUrlQueryInput {
        [key: string]: unknown;
    }

    type ParseFunction = {
        (urlStr: string): UrlWithStringQuery;
        (urlStr: string, parseQueryString: false | undefined, slashesDenoteHost?: boolean): UrlWithStringQuery;
        (urlStr: string, parseQueryString: true, slashesDenoteHost?: boolean): UrlWithParsedQuery;
        (urlStr: string, parseQueryString: boolean, slashesDenoteHost?: boolean): Url;
    };

    /**
     * maps premultiply flag and blendMode to adjusted blendMode
     * @memberof PIXI.utils
     * @const premultiplyBlendMode
     * @type {Array<number[]>}
     */
    export const premultiplyBlendMode: number[][];

    /**
     * combines rgb and alpha to out array
     *
     * @memberof PIXI.utils
     * @function premultiplyRgba
     * @param {Float32Array|number[]} rgb - input rgb
     * @param {number} alpha - alpha param
     * @param {Float32Array} [out] - output
     * @param {boolean} [premultiply=true] - do premultiply it
     * @returns {Float32Array} vec4 rgba
     */
    export function premultiplyRgba(rgb: Float32Array | number[], alpha: number, out?: Float32Array, premultiply?: boolean): Float32Array;

    /**
     * premultiplies tint
     *
     * @memberof PIXI.utils
     * @function premultiplyTint
     * @param {number} tint - integer RGB
     * @param {number} alpha - floating point alpha (0.0-1.0)
     * @returns {number} tint multiplied by alpha
     */
    export function premultiplyTint(tint: number, alpha: number): number;

    /**
     * converts integer tint and float alpha to vec4 form, premultiplies by default
     *
     * @memberof PIXI.utils
     * @function premultiplyTintToRgba
     * @param {number} tint - input tint
     * @param {number} alpha - alpha param
     * @param {Float32Array} [out] - output
     * @param {boolean} [premultiply=true] - do premultiply it
     * @returns {Float32Array} vec4 rgba
     */
    export function premultiplyTintToRgba(tint: number, alpha: number, out: Float32Array, premultiply?: boolean): Float32Array;

    /**
     * @todo Describe property usage
     *
     * @static
     * @name ProgramCache
     * @memberof PIXI.utils
     * @type {Object}
     */
    export const ProgramCache: {
        [key: string]: Program;
    };

    /**
     * Remove items from a javascript array without generating garbage
     *
     * @function removeItems
     * @memberof PIXI.utils
     * @param {Array<any>} arr - Array to remove elements from
     * @param {number} startIdx - starting index
     * @param {number} removeCount - how many to remove
     */
    export function removeItems(arr: any[], startIdx: number, removeCount: number): void;

    type ResolveFunction = {
        (from: string, to: string): string;
    };

    /**
     * Converts a color as an [R, G, B] array of normalized floats to a hexadecimal number.
     *
     * @example
     * PIXI.utils.rgb2hex([1, 1, 1]); // returns 0xffffff
     * @memberof PIXI.utils
     * @function rgb2hex
     * @param {number[]} rgb - Array of numbers where all values are normalized floats from 0.0 to 1.0.
     * @return {number} Number in hexadecimal.
     */
    export function rgb2hex(rgb: number[] | Float32Array): number;

    /**
     * Logs out the version and renderer information for this running instance of PIXI.
     * If you don't want to see this message you can run `PIXI.utils.skipHello()` before
     * creating your renderer. Keep in mind that doing that will forever make you a jerk face.
     *
     * @static
     * @function sayHello
     * @memberof PIXI.utils
     * @param {string} type - The string renderer type to log.
     */
    export function sayHello(type: string): void;

    /**
     * Returns sign of number
     *
     * @memberof PIXI.utils
     * @function sign
     * @param {number} n - the number to check the sign of
     * @returns {number} 0 if `n` is 0, -1 if `n` is negative, 1 if `n` is positive
     */
    export function sign(n: number): -1 | 0 | 1;

    /**
     * Skips the hello message of renderers that are created after this is run.
     *
     * @function skipHello
     * @memberof PIXI.utils
     */
    export function skipHello(): void;

    /**
     * Converts a string to a hexadecimal color number.
     * It can handle:
     *  hex strings starting with #: "#ffffff"
     *  hex strings starting with 0x: "0xffffff"
     *  hex strings without prefix: "ffffff"
     *  css colors: "black"
     *
     * @example
     * PIXI.utils.string2hex("#ffffff"); // returns 0xffffff
     * @memberof PIXI.utils
     * @function string2hex
     * @param {string} string - The string color (e.g., `"#ffffff"`)
     * @return {number} Number in hexadecimal.
     */
    export function string2hex(string: string): number;

    /**
     * @todo Describe property usage
     *
     * @static
     * @name TextureCache
     * @memberof PIXI.utils
     * @type {Object}
     */
    export const TextureCache: {
        [key: string]: Texture;
    };

    /**
     * Trim transparent borders from a canvas
     *
     * @memberof PIXI.utils
     * @function trimCanvas
     * @param {HTMLCanvasElement} canvas - the canvas to trim
     * @returns {object} Trim data
     */
    export function trimCanvas(canvas: HTMLCanvasElement): {
        width: number;
        height: number;
        data?: ImageData;
    };

    /**
     * Gets the next unique identifier
     *
     * @memberof PIXI.utils
     * @function uid
     * @return {number} The next unique identifier to use.
     */
    export function uid(): number;

    interface Url extends UrlObjectCommon {
        port?: string;
        query?: string | null | ParsedUrlQuery;
    }

    export const url: {
        parse: ParseFunction;
        format: FormatFunction;
        resolve: ResolveFunction;
    };

    interface URLFormatOptions {
        auth?: boolean;
        fragment?: boolean;
        search?: boolean;
        unicode?: boolean;
    }

    interface UrlObject extends UrlObjectCommon {
        port?: string | number;
        query?: string | null | ParsedUrlQueryInput;
    }

    interface UrlObjectCommon {
        auth?: string;
        hash?: string;
        host?: string;
        hostname?: string;
        href?: string;
        path?: string;
        pathname?: string;
        protocol?: string;
        search?: string;
        slashes?: boolean;
    }

    interface UrlWithParsedQuery extends Url {
        query: ParsedUrlQuery;
    }

    interface UrlWithStringQuery extends Url {
        query: string | null;
    }
}
declare module PIXI.filters {
    /////////////////////////////////////////////////
    ////////////////filter-alpha//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * Simplest filter - applies alpha.
     *
     * Use this instead of Container's alpha property to avoid visual layering of individual elements.
     * AlphaFilter applies alpha evenly across the entire display object and any opaque elements it contains.
     * If elements are not opaque, they will blend with each other anyway.
     *
     * Very handy if you want to use common features of all filters:
     *
     * 1. Assign a blendMode to this filter, blend all elements inside display object with background.
     *
     * 2. To use clipping in display coordinates, assign a filterArea to the same container that has this filter.
     *
     * @memberof PIXI.filters
     */
    export class AlphaFilter extends Filter {
        /**
         * @param alpha - Amount of alpha from 0 to 1, where 0 is transparent
         */
        constructor(alpha?: number);
        /**
         * Coefficient for alpha multiplication
         *
         * @default 1
         */
        get alpha(): number;
        set alpha(value: number);
    }


}
declare module PIXI.filters {
    /////////////////////////////////////////////////
    ////////////////filter-blur//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * The BlurFilter applies a Gaussian blur to an object.
     *
     * The strength of the blur can be set for the x-axis and y-axis separately.
     *
     * @memberof PIXI.filters
     */
    export class BlurFilter extends Filter {
        blurXFilter: BlurFilterPass;
        blurYFilter: BlurFilterPass;
        private _repeatEdgePixels;
        /**
         * @param strength - The strength of the blur filter.
         * @param quality - The quality of the blur filter.
         * @param [resolution=PIXI.settings.FILTER_RESOLUTION] - The resolution of the blur filter.
         * @param kernelSize - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
         */
        constructor(strength?: number, quality?: number, resolution?: number, kernelSize?: number);
        /**
         * Applies the filter.
         *
         * @param filterManager - The manager.
         * @param input - The input target.
         * @param output - The output target.
         * @param clearMode - How to clear
         */
        apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode: CLEAR_MODES): void;
        protected updatePadding(): void;
        /**
         * Sets the strength of both the blurX and blurY properties simultaneously
         *
         * @default 2
         */
        get blur(): number;
        set blur(value: number);
        /**
         * Sets the number of passes for blur. More passes means higher quality bluring.
         *
         * @default 1
         */
        get quality(): number;
        set quality(value: number);
        /**
         * Sets the strength of the blurX property
         *
         * @default 2
         */
        get blurX(): number;
        set blurX(value: number);
        /**
         * Sets the strength of the blurY property
         *
         * @default 2
         */
        get blurY(): number;
        set blurY(value: number);
        /**
         * Sets the blendmode of the filter
         *
         * @default PIXI.BLEND_MODES.NORMAL
         */
        get blendMode(): BLEND_MODES;
        set blendMode(value: BLEND_MODES);
        /**
         * If set to true the edge of the target will be clamped
         *
         * @default false
         */
        get repeatEdgePixels(): boolean;
        set repeatEdgePixels(value: boolean);
    }

    /**
     * The BlurFilterPass applies a horizontal or vertical Gaussian blur to an object.
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    export class BlurFilterPass extends Filter {
        horizontal: boolean;
        strength: number;
        passes: number;
        private _quality;
        /**
         * @param {boolean} horizontal - Do pass along the x-axis (`true`) or y-axis (`false`).
         * @param {number} [strength=8] - The strength of the blur filter.
         * @param {number} [quality=4] - The quality of the blur filter.
         * @param {number} [resolution=PIXI.settings.FILTER_RESOLUTION] - The resolution of the blur filter.
         * @param {number} [kernelSize=5] - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
         */
        constructor(horizontal: boolean, strength?: number, quality?: number, resolution?: number, kernelSize?: number);
        /**
         * Applies the filter.
         *
         * @param {PIXI.FilterSystem} filterManager - The manager.
         * @param {PIXI.RenderTexture} input - The input target.
         * @param {PIXI.RenderTexture} output - The output target.
         * @param {PIXI.CLEAR_MODES} clearMode - How to clear
         */
        apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode: CLEAR_MODES): void;
        /**
         * Sets the strength of both the blur.
         *
         * @member {number}
         * @default 16
         */
        get blur(): number;
        set blur(value: number);
        /**
         * Sets the quality of the blur by modifying the number of passes. More passes means higher
         * quality bluring but the lower the performance.
         *
         * @member {number}
         * @default 4
         */
        get quality(): number;
        set quality(value: number);
    }


}
declare module PIXI.filters {
    /////////////////////////////////////////////////
    ////////////////filter-color-matrix//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    export type ColorMatrix = any;

    /**
     * The ColorMatrixFilter class lets you apply a 5x4 matrix transformation on the RGBA
     * color and alpha values of every pixel on your displayObject to produce a result
     * with a new set of RGBA color and alpha values. It's pretty powerful!
     *
     * ```js
     *  let colorMatrix = new PIXI.filters.ColorMatrixFilter();
     *  container.filters = [colorMatrix];
     *  colorMatrix.contrast(2);
     * ```
     * @author Clément Chenebault <clement@goodboydigital.com>
     * @memberof PIXI.filters
     */
    export class ColorMatrixFilter extends Filter {
        grayscale: (scale: number, multiply: boolean) => void;
        constructor();
        /**
         * Transforms current matrix and set the new one
         *
         * @param {number[]} matrix - 5x4 matrix
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        private _loadMatrix;
        /**
         * Multiplies two mat5's
         *
         * @private
         * @param out - 5x4 matrix the receiving matrix
         * @param a - 5x4 matrix the first operand
         * @param b - 5x4 matrix the second operand
         * @returns {number[]} 5x4 matrix
         */
        private _multiply;
        /**
         * Create a Float32 Array and normalize the offset component to 0-1
         *
         * @param {number[]} matrix - 5x4 matrix
         * @return {number[]} 5x4 matrix with all values between 0-1
         */
        private _colorMatrix;
        /**
         * Adjusts brightness
         *
         * @param b - value of the brigthness (0-1, where 0 is black)
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        brightness(b: number, multiply: boolean): void;
        /**
         * Sets each channel on the diagonal of the color matrix.
         * This can be used to achieve a tinting effect on Containers similar to the tint field of some
         * display objects like Sprite, Text, Graphics, and Mesh.
         *
         * @param color - Color of the tint. This is a hex value.
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        tint(color: number, multiply?: boolean): void;
        /**
         * Set the matrices in grey scales
         *
         * @param scale - value of the grey (0-1, where 0 is black)
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        greyscale(scale: number, multiply: boolean): void;
        /**
         * Set the black and white matrice.
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        blackAndWhite(multiply: boolean): void;
        /**
         * Set the hue property of the color
         *
         * @param rotation - in degrees
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        hue(rotation: number, multiply: boolean): void;
        /**
         * Set the contrast matrix, increase the separation between dark and bright
         * Increase contrast : shadows darker and highlights brighter
         * Decrease contrast : bring the shadows up and the highlights down
         *
         * @param amount - value of the contrast (0-1)
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        contrast(amount: number, multiply: boolean): void;
        /**
         * Set the saturation matrix, increase the separation between colors
         * Increase saturation : increase contrast, brightness, and sharpness
         *
         * @param amount - The saturation amount (0-1)
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        saturate(amount?: number, multiply?: boolean): void;
        /**
         * Desaturate image (remove color)
         *
         * Call the saturate function
         */
        desaturate(): void;
        /**
         * Negative image (inverse of classic rgb matrix)
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        negative(multiply: boolean): void;
        /**
         * Sepia image
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        sepia(multiply: boolean): void;
        /**
         * Color motion picture process invented in 1916 (thanks Dominic Szablewski)
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        technicolor(multiply: boolean): void;
        /**
         * Polaroid filter
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        polaroid(multiply: boolean): void;
        /**
         * Filter who transforms : Red -> Blue and Blue -> Red
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        toBGR(multiply: boolean): void;
        /**
         * Color reversal film introduced by Eastman Kodak in 1935. (thanks Dominic Szablewski)
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        kodachrome(multiply: boolean): void;
        /**
         * Brown delicious browni filter (thanks Dominic Szablewski)
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        browni(multiply: boolean): void;
        /**
         * Vintage filter (thanks Dominic Szablewski)
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        vintage(multiply: boolean): void;
        /**
         * We don't know exactly what it does, kind of gradient map, but funny to play with!
         *
         * @param desaturation - Tone values.
         * @param toned - Tone values.
         * @param lightColor - Tone values, example: `0xFFE580`
         * @param darkColor - Tone values, example: `0xFFE580`
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        colorTone(desaturation: number, toned: number, lightColor: number, darkColor: number, multiply: boolean): void;
        /**
         * Night effect
         *
         * @param intensity - The intensity of the night effect.
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        night(intensity: number, multiply: boolean): void;
        /**
         * Predator effect
         *
         * Erase the current matrix by setting a new indepent one
         *
         * @param amount - how much the predator feels his future victim
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        predator(amount: number, multiply: boolean): void;
        /**
         * LSD effect
         *
         * Multiply the current matrix
         *
         * @param multiply - if true, current matrix and matrix are multiplied. If false,
         *  just set the current matrix with @param matrix
         */
        lsd(multiply: boolean): void;
        /** Erase the current matrix by setting the default one. */
        reset(): void;
        /**
         * The matrix of the color matrix filter
         *
         * @member {number[]}
         * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
         */
        get matrix(): ColorMatrix;
        set matrix(value: ColorMatrix);
        /**
         * The opacity value to use when mixing the original and resultant colors.
         *
         * When the value is 0, the original color is used without modification.
         * When the value is 1, the result color is used.
         * When in the range (0, 1) the color is interpolated between the original and result by this amount.
         *
         * @default 1
         */
        get alpha(): number;
        set alpha(value: number);
    }


}
declare namespace PIXI.filters {
    /////////////////////////////////////////////////
    ////////////////filter-displacement//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * The DisplacementFilter class uses the pixel values from the specified texture
     * (called the displacement map) to perform a displacement of an object.
     *
     * You can use this filter to apply all manor of crazy warping effects.
     * Currently the `r` property of the texture is used to offset the `x`
     * and the `g` property of the texture is used to offset the `y`.
     *
     * The way it works is it uses the values of the displacement map to look up the
     * correct pixels to output. This means it's not technically moving the original.
     * Instead, it's starting at the output and asking "which pixel from the original goes here".
     * For example, if a displacement map pixel has `red = 1` and the filter scale is `20`,
     * this filter will output the pixel approximately 20 pixels to the right of the original.
     *
     * @memberof PIXI.filters
     */
    export class DisplacementFilter extends Filter {
        maskSprite: ISpriteMaskTarget;
        maskMatrix: Matrix;
        scale: Point;
        /**
         * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
         * @param scale - The scale of the displacement
         */
        constructor(sprite: ISpriteMaskTarget, scale?: number);
        /**
         * Applies the filter.
         *
         * @param filterManager - The manager.
         * @param input - The input target.
         * @param output - The output target.
         * @param clearMode - clearMode.
         */
        apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode: CLEAR_MODES): void;
        /** The texture used for the displacement map. Must be power of 2 sized texture. */
        get map(): Texture;
        set map(value: Texture);
    }


}
declare module PIXI.filters {
    /////////////////////////////////////////////////
    ////////////////filter-fxaa//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * Basic FXAA (Fast Approximate Anti-Aliasing) implementation based on the code on geeks3d.com
     * with the modification that the texture2DLod stuff was removed since it is unsupported by WebGL.
     *
     * @see https://github.com/mitsuhiko/webgl-meincraft
     *
     * @memberof PIXI.filters
     */
    export class FXAAFilter extends Filter {
        constructor();
    }


}
declare module PIXI.filters {
    /////////////////////////////////////////////////
    ////////////////filter-noise//////////////////////
    /////////////////////////////////////////////////
    //------------ index.d.ts

    /**
     * A Noise effect filter.
     *
     * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/noise.js
     *
     * @memberof PIXI.filters
     * @author Vico @vicocotea
     */
    export class NoiseFilter extends Filter {
        /**
         * @param {number} [noise=0.5] - The noise intensity, should be a normalized value in the range [0, 1].
         * @param {number} [seed] - A random seed for the noise generation. Default is `Math.random()`.
         */
        constructor(noise?: number, seed?: number);
        /**
         * The amount of noise to apply, this value should be in the range (0, 1].
         *
         * @default 0.5
         */
        get noise(): number;
        set noise(value: number);
        /** A seed value to apply to the random noise generation. `Math.random()` is a good value to use. */
        get seed(): number;
        set seed(value: number);
    }


}
