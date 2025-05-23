import { ArrowRight } from "lucide-react"

const brandColors = [
    {
        title: 'Cysic Deep Matter',
        subTitle: '#090A09',
        desc: 'Cysic\'s signature background tone — this isn\'t just black, it\'s architectural void, the silence between light pulses, the foundation where all logic is built. Stable. Infinite. Weightless.',
        className: 'bg-black border'
    },
    {
        title: 'Graphite Logic',
        subTitle: '#333333',
        desc: 'It\'s the metallic silence beneath your pulses of light, the floor of the architecture - functional, grounded, and unyielding.',
        className: 'bg-[#333333]'
    },
    {
        title: 'Singularity White',
        subTitle: '#FFFFFF',
        desc: 'The perfect neutral — the light of clarity, the moment of verification, the end-state where everything collapses into truth. A clean field for interaction, composition, and space.',
        className: 'bg-white text-black'
    },
    {
        title: 'Quantum Violet',
        subTitle: '#6B2CE1',
        desc: 'A rich electric violet, this evokes the shimmer of ZK proofs firing in parallel, the mystic light inside the Prover Core, or the rare energy pulsing through a zero-knowledge gate.',
        className: 'bg-[#6B2CE1] '
    },
    {
        title: 'Neon Flow',
        subTitle: '#00FFCD',
        desc: 'This color pulses like high-frequency data, the lifeblood of proving acceleration. It’s fluid yet sharp — the exact moment when light turns into information. It evokes real-time action, connectivity, and a luminous kind of intelligence.',
        className: 'bg-[#00FFCD] text-black'
    },
]

const symbolLogos = [
    {
        title: 'Symbol White',
        img: '/mediaKit/symbol_white.svg',
        className: "w-[9.25rem]"
    },
    {
        title: 'Symbol Black',
        img: '/mediaKit/symbol_black.svg',
        className: "w-[9.25rem]"
    },
    {
        title: 'Symbol Gradient',
        img: '/mediaKit/symbol_gradient.svg',
        className: "w-[9.25rem]"
    },
]

const horizontalLogos = [
    {
        title: 'Horizontal White',
        img: '/mediaKit/horizontal_white.svg',
        className: "w-[18.5rem]"
    },
    {
        title: 'Horizontal Black',
        img: '/mediaKit/horizontal_black.svg',
        className: "w-[18.5rem]"
    },
    {
        title: 'Horizontal Gradient',
        img: '/mediaKit/horizontal_gradient.svg',
        className: "w-[18.5rem]"
    },
]

const verticalLogos = [
    {
        title: 'Vertical White',
        img: '/mediaKit/vertical_white.svg',
        className: "w-[9.25rem]"
    },
    {
        title: 'Vertical Black',
        img: '/mediaKit/vertical_black.svg',
        className: "w-[9.25rem]"
    },
    {
        title: 'Vertical Gradient',
        img: '/mediaKit/vertical_gradient.svg',
        className: "w-[9.25rem]"
    },
]

const IconDiplayAndDownload = ({ item }: { item: any }) => {

    const handleDownload = (type: string) => {
        const currentPath = item.img;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('.'));
        
        const newPath = `${basePath}.${type.toLowerCase()}`;
        
        const link = document.createElement('a');
        link.href = newPath;
        link.download = `${item.title}.${type.toLowerCase()}`;
        link.click();
    }

    return (<>
        <div className="flex-1 flex flex-col gap-6 items-center justify-center w-[26rem]">
            <div className="flex flex-col gap-4 items-center justify-center">
                <img src={item.img} alt={item.title} className={item.className} />
                <span className="text-center tracking-widest teachers-24-400 teachers-24-400">{item.title}</span>
                <div className="flex items-center gap-6">
                    <p className="flex items-center gap-2 cursor-pointer" onClick={() => handleDownload('jpg')}>
                        <span className="teachers-16-400">JPG</span>
                        <ArrowRight className="size-4" />
                    </p>
                    <p className="flex items-center gap-2 cursor-pointer" onClick={() => handleDownload('png')}>
                        <span className="teachers-16-400">PNG</span>
                        <ArrowRight className="size-4" />
                    </p>
                    <p className="flex items-center gap-2 cursor-pointer" onClick={() => handleDownload('svg')}>
                        <span className="teachers-16-400">SVG</span>
                        <ArrowRight className="size-4" />
                    </p>
                </div>
            </div>
        </div>
    </>)
}

const Mediakit = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="unbounded-180-200">media kit</div>
                <span className="teachers-24-400 tracking-widest">brand assets</span>
            </div>

            <div className="bg-white py-14 flex flex-col gap-2 items-center text-center">
                <span className="!normal-case teachers-16-400 text-black">Cysic is a leading ZK Hardware acceleration company in the industry and the first ZK Prover Network to provide</span>
                <div className="unbounded-32-500 text-gradient-v1 flex text-center">ZK-CaaS (ZK Compute-as-a-Service)</div>
                <span className="!normal-case teachers-16-400 text-black">Our goal is to address the computational inefficiencies in ZK proofs and enable real-time ZK proof generation.</span>
            </div>

            <div className="py-14 flex flex-col gap-12 items-center">
                <div className="unbounded-64-300">
                    CYSIC LOGOS
                </div>

                <div className="flex flex-col gap-6">

                    <div className="flex gap-6">
                        {symbolLogos.map(i => (
                            <IconDiplayAndDownload key={i.title} item={i} />
                        ))}
                    </div>

                    <div className="flex gap-6">
                        {horizontalLogos.map(i => (
                            <IconDiplayAndDownload key={i.title} item={i} />
                        ))}
                    </div>

                    <div className="flex gap-6">
                        {verticalLogos.map(i => (
                            <IconDiplayAndDownload key={i.title} item={i} />
                        ))}
                    </div>


                </div>


            </div>



            <div className="py-14 flex flex-col gap-12 items-center">
                <div className="unbounded-64-300">
                    Brand Colors
                </div>
                <div className="flex flex-wrap gap-6">
                    {brandColors.map(i => (
                        <div key={i.title} className={`max-w-[15.625rem] flex flex-col gap-4 p-6 rounded-md ${i.className}`}>
                            <span className="tracking-widest teachers-24-400">{i.title}</span>
                            <span className="tracking-widest teachers-16-400">{i.subTitle}</span>
                            <p className="!normal-case teachers-16-400 leading-[1.3]">{i.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Mediakit