import React from "react";
import { Navbar } from "../../components/Navbar/index";
import { Footer } from "../../components/Footer";


 const Research = () => {
  return (
    <>
    <Navbar />
    <div className="wrapper">
      <section className="Header">
        <h1 className="Header_one_emf_elf">EMF & ELF Sensitivity</h1>
      </section>
      <iframe
        width="100%"
        height="600"
        src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/6411c4500369c71f7e773e89_Gut video compressed2-transcode.mp4"
        title="Hey Pet Owner, Check out the Alpha Wolfe Nutritional Test that would make your dog healthy and happy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
 

      <section className="Alpha_details_emf_and_elf">
        <p className="Alpha_details_emf_and_elf_para_1">
        DNA has been considered a closed and stable system of static information storage, but in recent years a second genetic code has been discovered in DNA (epigenetic). Epigenetic mapping has the potential to release an entire being from genetic limitations and opens new wellness and performance possibilities. A process known as epigenetics studies the way in which genes are activated and deactivated during their lifetime.
        </p>
        <p className="Alpha_details_emf_and_elf_para_2">
        The various types of cells in our body have different appearances and different functions. To become a cell of the skin or a neuron, in the passage of information written in the DNA of a cell to RNA, with a mechanism called protein synthesis that serves the production of specific proteins, the RNA carries out the instructions of the DNA, but it is controlled by epigenetic signals that turn off or light up certain genes. The epigenetic chemical signals act as switches, these places in front of the genes not only can activate or deactivate the genes, but they act to tune and make them functional, they change the levels of activity of the genes in sending instructions to produce proteins. There are more types of these signals, some mean stopping, others mean continuing, but others can change genetic activity more subtly.
        </p>
      </section>

      <iframe 
      width="100%"
      height="621" 
      src="https://www.youtube.com/embed/muEyvtCV34w" 
      title="Hey Pet Owner, Check out the Alpha Wolfe Nutritional Test that would make your dog healthy and happy" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
       ></iframe>

 
    </div>
    <Footer></Footer>

    </>
  );
};




export default Research;