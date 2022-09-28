namespace fgui.utils {

    export type AttributeDictionary = {
        [key: string]: string;
    }

    export class XmlNode {
        public context: Node;
        public nodeName: string;
        public type: number;
        public text: string;

        private $children: XmlNode[];
        private $attributes: AttributeDictionary;

        public constructor(ele: Node) {
            this.nodeName = ele.nodeName;
            this.context = ele;
            this.type = ele.nodeType;
            this.text = (this.type == Node.COMMENT_NODE || this.type == Node.TEXT_NODE||this.type==Node.ELEMENT_NODE) ? this.context.textContent : null;
        }

        public get children(): XmlNode[] {
            if (!this.$children)
                this.$children = this.__parseChildNodes(this);
            return this.$children;
        }

        public get attributes(): AttributeDictionary {
            if (!this.$attributes)
                this.$attributes = this.__parseNodeAttributes(this);
            return this.$attributes;
        }

        public getChildNodes(matchName: string = null): XmlNode[] {
            let nodes: XmlNode[] = this.children;
            let ret: XmlNode[] = [];
            if (!nodes || nodes.length <= 0) return ret;
            let len: number = nodes.length;
            for (let i: number = 0; i < len; i++) {
                let n: XmlNode = nodes[i];
                if (n.type == Node.TEXT_NODE){
                    continue;
                }
                if (!matchName || (matchName && matchName.length > 0 && n.nodeName.toLowerCase() == matchName.toLowerCase()))
                    ret.push(n);
            }
            return ret;
        }

        
        private __parseChildNodes(xml: XmlNode, matchName: string = null): XmlNode[] {
            let nodes: NodeList = xml.context.childNodes;
            let ret: XmlNode[] = [];
            if (!nodes || nodes.length <= 0) return ret;
            let len: number = nodes.length;
            for (let i: number = 0; i < len; i++) {
                let n: Node = nodes.item(i);
                if (n.nodeType == Node.TEXT_NODE){
                    continue;
                }
                if (!matchName || (matchName && matchName.length > 0 && n.nodeName.toLowerCase() == matchName.toLowerCase()))
                    ret.push(new XmlNode(n));
            }
            return ret;
        }

        private __parseNodeAttributes(xml: XmlNode): AttributeDictionary {
            let asList: NamedNodeMap = (xml.context as any).attributes;
            let ret: AttributeDictionary = {};
            if (!asList || asList.length <= 0) return ret;
            let len: number = asList.length;
            for (let i = 0; i < len; i++) {
                let a: Attr = asList.item(i);
                ret[a.nodeName] = a.nodeValue;
            }
            return ret;
        }
    }

    export class XmlParser {

        private static $parser: DOMParser = new DOMParser();

        public static tryParse(xmlstring: string, mimeType: any = "text/xml"): XmlNode {
            let doc: Document = XmlParser.$parser.parseFromString(xmlstring, mimeType);
            if (doc && doc.childNodes && doc.childNodes.length >= 1)
                return new XmlNode(doc.firstChild);
            return null;
        }

        public static getXmlRoot(xml: XmlNode): XmlNode {
            if (!xml || !xml.context)
                throw new Error("Invalid xml node");
            let p: Node = xml.context;
            while (p.parentNode != null)
                p = p.parentNode;
            return p == xml.context ? xml : new XmlNode(p);
        }

    }
}