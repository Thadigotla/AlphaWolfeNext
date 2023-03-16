import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Image  from 'next/image'
  


 const Epigenetics = () => {
  return (
    <>
    <Navbar/>
    <div className="wrapper">
      <section className="Header">
        <h1 className="Header_one">Epigenetics</h1>
        <h3 className="Header_two">The key to healthy living</h3>
      </section>
      {/* <iframe
        width="100%"
        height="600"
        src="https://www.youtube.com/watch?v=muEyvtCV34w&ab_channel=AlphaWolfe"
        title="Hey Pet Owner, Check out the Alpha Wolfe Nutritional Test that would make your dog healthy and happy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe> */}
      <iframe width="100%" height="621" src="https://www.youtube.com/embed/muEyvtCV34w" title="Hey Pet Owner, Check out the Alpha Wolfe Nutritional Test that would make your dog healthy and happy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

 

      <section className="Alpha_details">
        <div className="Alpha_details_para_1">
          The S- Drive is a wellness device, it is not designed to diagnose,
          detect or cure any illness. The S Drive is operated in 67 countries
          by: wellbeing practitioners, sports professionals, fitness and beauty
          centres, nutritional professionals, Dietary Advisors, Weight Loss
          Centres, Spa Resorts and preventative organisations.
        </div>
        <div className="Alpha_details_para_2">
          The S Drive is a portable device with a spectrum coil in its centre.
          We use the hair root bulb as an informational source, since the hair
          follicle is a part of the sensory system of the body. This In-Vivo
          biomarker expresses information from the environment that is present
          in the energy field.
        </div>
        <div className="Alpha_details_para_3">
          The coil detects the hair & bulb resonance information, which is then
          digitized and sent securely to our remote computer centre in Germany,
          where the hair and bulbs digitized information is then decrypted. The
          information is then run through powerful logarithms in order to reveal
          relevancy and challenges, which the underlying systems of the body may
          have been experiencing over time. The resulting relevancy information
          provides a personalized, real-time overview of the underlying
          nutritional and metabolic conditions, which determine wellness and
          wellbeing.
        </div>
        <div className="Alpha_details_para_4">
          The technology relies on digitizing the information found in four
          strands of hair with their bulbs attached, Plucked from the occipital
          area of the scull and within three minutes digitised. The hair and
          bulb follicles have proven to be effective biomarkers, as they
          accumulate information of Homeostasis and epigenetics over time.
        </div>
      </section>

      <section className="Alpha_details_block_1" >
        <div className="Alpha_details_block_1_left"> 
        <Image
          alt="image"
          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef350d228a5d8eda0ce_e1.webp"
           loading="lazy"
          layout="fill"
          srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef350d228a5d8eda0ce_e1-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef350d228a5d8eda0ce_e1.webp 741w"
        />
        </div>
        <div className="Alpha_details_block_1_right">
          <div className="Alpha_details_block_1_right_para_1">
            Epigenetics is the science that shows that we do not need to be
            victims of our genetic inheritance. The Human Genome project was
            expected to confirm the existence of over 100,000 individual genes.
          </div>
          <div className="Alpha_details_block_1_right_para_2">
            However, it was discovered that only 23,000 genes make up the human
            genome, barely more than the common fruit fly and far less than
            those found in a grain of rice.
          </div>
          <div className="Alpha_details_block_1_right_para_3">
            This raised the question of what else could be controlling gene
            expression?
          </div>
          <div className="Alpha_details_block_1_right_para_4">
            The answer is Epigenetics, which is the interaction between
            environmental signals and the process of adaptation that living
            systems use to thrive. Back in 1700’s Jean-Baptiste Lamarck proposed
            that life forms could acquire ‘information’ from their environment
            and incorporate it into their epigenome.
          </div>
          <div className="Alpha_details_block_1_right_para_5">
            Quantum Physics was incorporated into the field of molecular biology
            by Erwin Schrödinger to set the basis for what we now know as
            epigenetics.
          </div>
        </div>
      </section>

      <section className="Alpha_details_block_2">
        <div className="Alpha_details_block_2_para">
          The ectoderm is the extreme outer layer of the neural tube, which
          forms at the end of the 4th week of gestation. This develops the hair
          as well as the rest of integumentary system, which comprises the skin,
          the nails, the teeth along with the nervous system comprising the
          brain, the spinal cord and nerves. A developing foetus has all of its
          hair follicles created by the 22nd week of pregnancy. At this time,
          there are at least 5 million follicles over the body; one million of
          these are on the head, this will be the largest number of follicles we
          will ever have, as follicles cannot be added later in life. When we
          grow older, the size of the body increases and the density of hair
          follicles on the skin decreases.
        </div>
      </section>

      <section className="Alpha_details_block_3">
        <div className="Alpha_details_block_3_left">
          <div className="Alpha_details_block_3_left_para_1">
            Today, we know that gene expression that is not mediated by coding
            DNA, representing only 2% of the genomic expression. It is rather
            influenced by informational signals received from the environment by
            non-coding DNA, which represent the remaining 98% of what is
            referred to as junk DNA.
          </div>
          <div className="Alpha_details_block_3_left_para_2">
            {" "}
            Harmful information emanating from the environment such as Electro
            Magnetic stressors and toxic air pollutants, cause disharmony, so
            the human body responds accordingly changing the phenotype without
            altering the genotype. This change is reflected in our physiology.
          </div>
          <div className="Alpha_details_block_3_left_para_3">
            These signals include information from the air we breathe, the food
            we eat, the water we drink, the sleep we did not get, the impact of
            the electromagnetic environment and even the arguments we are having
            and the 50,000+ thoughts we have per day.
          </div>
        </div>
        <div className="Alpha_details_block_3_right" style={{position:"relative"}}>
          <Image
            alt="image"
            layout="fill"
            src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef30a0b1f400283f29b_e2.webp"
            srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef30a0b1f400283f29b_e2-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef30a0b1f400283f29b_e2-p-800.webp 800w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef30a0b1f400283f29b_e2.webp 846w"
          />
        </div>
      </section>

      <section className="Alpha_details_block_4">
        <div className="Alpha_details_block_4_para_1">
          {" "}
          Alpha Wolfe’s partnership with Cell Wellbeing’s intelligent epigenetic
          mapping system consists of two parts: the biological information
          calculation model procedure and the basic biological sample
          characteristic database, which consists of a database reflecting the
          biological information fields of humans, nutrition and plants in most
          regions of the world. When the automated intelligent mapping
          algorithms in Germany receive the secure digitized biological field
          data, they then decrypt and decode this data before using its content
          to map the complicated biological information.{" "}
        </div>
        <div className="Alpha_details_block_4_para_2">
          {" "}
          The German algorithm calculates the relevancy of each specific data
          item to determine the weighting of each individual category. The
          report presents this information as a % of relevancy in each
          individual pie chart graph.{" "}
        </div>
      </section>

      <section className="Alpha_details_block_1" style={{position:"relative"}}>
        <div className="Alpha_details_block_1_left">
        <Image
          alt="image"
          layout="fill"
          objectFit="contain"
          style={{borderRadius:"5%"}}
          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef490337bdf46734365_e3.webp"
          loading="lazy"
        />
        </div>
        <div className="Alpha_details_block_1_right">
          <h3>WHY THE HAIR BULB IS AN Epigenetic Marker</h3>
          <div className="Alpha_details_block_1_right_para_1">
            Hair belongs to the integumentary system that develops from the
            ectoderm and thus it has the same embryological origin as the
            nervous system. Therefore, it shares the same characteristics as the
            neurons when it comes to sensation.
          </div>
          <div className="Alpha_details_block_1_right_para_2">
            The root/bulb of the hair is the only part of the hair that is
            alive. Meaning it is able to self-regulate and self-replicate. It
            feeds from the blood vessels that bring information and nutrients
            from the systemic microcirculation which is subcutaneous through the
            papilla.
          </div>
          <div className="Alpha_details_block_1_right_para_3">
            The hair and its bulb are in fact an antenna that is constantly
            sensing and thus detecting environmental signals emanating from the
            micro and macro environment. So much so, that within the
            pilosebaceous unit there is a muscle called the arrector pili
            muscle, which are small muscles attached to hair follicles and are
            the smallest muscles in the body.
          </div>
          <div className="Alpha_details_block_1_right_para_3">
            This is the muscle that works as much as the cardiac muscle, since
            it is constantly sensing not just changes in temperature and
            atmospheric pressure, but vibration through resonance, and
            frequencies from the ecosystem and the surrounding area. The
            arrector pili muscle, along with the hair root bulb, were
            over-looked until recently as important environmental sensors - even
            though the hair has been accepted as an excellent bio marker.
          </div>
          <div className="Alpha_details_block_1_right_para_3">
            The arrector pili muscle reacts instantly to a systems shock and
            fear, causing the hair to ‘stand on end’. The arrector pili muscle
            also relaxes when the system is calm. In addition, its ‘sensing’
            abilities have also been associated with the forewarning of
            impending danger. The arrector pili muscle also expands and
            contracts when the system is over heated or cooled. Therefore, the
            root bulb stores the epigenetic resonance information as it is
            connected to the arrector pili muscle.
          </div>
        </div>
      </section>

      <section className="Alpha_details_block_2">
        <div className="Alpha_details_block_2_para">
          The S-Drive has an intended use that relates to supporting,
          maintaining or encouraging a general state of health. The S-Drive
          detects epigenetic signals that influence gene expression, so that
          changes to diet, nutrition and lifestyle can be adopted to support
          optimal physiology and performance. The S-Drive is neither invasive
          nor implanted, and does not involve a technology that may pose a risk
          to the safety of users or other persons if specific regulatory
          controls are not applied, such as, for example, risks from lasers or
          radiation exposure. Importantly, the S-Drive is not intended to
          diagnose, treat, cure, or prevent disease, as expressly stated on the
          reports that are generated from the S-Drive. The S-Drive is fully
          compliant with FDA guidance 1300013 (UCM429674).
        </div>
      </section>

      <section className="Alpha_details_block_3">
        <div className="Alpha_details_block_3_left">
          <div className="Alpha_details_block_3_left_para_1">
            Environmental and nutritional impact on a system is reflected in
            this cascade of information. A useful analogy of this effect could
            be viewed as a pebble thrown into a pond and causing ripples which
            radiate out. These ripples (waves) carry much more information about
            the potential impact of the environment than just looking at the
            pebble alone. The small waves are constantly moving, interacting and
            adapting to all of the other environmental waves in the pond, before
            they fade away.
          </div>
          <div className="Alpha_details_block_3_left_para_2">
            Alpha Wolfe has partnered with Cell Wellbeings Epigenetic
            technology to allows us to understand the interactions of impacts
            from the whole environmental picture and not just see each impacting
            wave or even the pebble in isolation. It is this information which
            provides users with new and completely different views of their
            living environment.
          </div>
          <div className="Alpha_details_block_3_left_para_3">
            Fresh hair bulb and shaft information must be digitized within the
            first 3 minutes of plucking, for those who are keen on a
            preventative, ongoing, anti-aging nutritional strategy. This type of
            information is obtainable by scanning four strands of hair and their
            roots. In many cases, the 30++ page report reflects underlying
            environmental and dietary issues long before they present
            physically. The hair and their roots should be plucked from the
            occipital bone above the nape of the neck.
          </div>
          <div className="Alpha_details_block_3_left_para_3">
            Indications of a wide range of nutritional issues are highlighted in
            this type of epigenetic information before they appear as physical
            needs or actual deficiencies. The returned Environmental Statement
            could indicate that there is a high probability that some of the
            nutritional stores are empty, even when the blood or tissues show
            normal levels. As the signature waves are not a physical measure,
            but a carrier of information, they display a different picture of
            what may need addressing. Knowing this allows people to consider
            pre-emptive measures against premature ageing, or performance
            issues, by correcting potential weaknesses or other issues
            associated with a poor nutritional diet or a toxic environment.
          </div>
        </div>
        <div className="Alpha_details_block_3_right" >
         <div className="Alpha_details_block_3_right_img">
          <Image
            alt="image"
            layout="fill"
            objectFit="contain"
            src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef33e9f3b0de3b18161_e4.webp"
            srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef30a0b1f400283f29b_e2-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef30a0b1f400283f29b_e2-p-800.webp 800w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef30a0b1f400283f29b_e2.webp 846w"
          />
        </div>
        </div>
      </section>

      <section className="Alpha_details_block_1"  >
        <div className="Alpha_details_block_1_left">

        <Image
          alt="image"
          layout="fill"
          objectFit="contain"
          src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3c34465e3acfa120c_e5.webp"
          srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3c34465e3acfa120c_e5-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3c34465e3acfa120c_e5-p-800.webp 800w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3c34465e3acfa120c_e5-p-1080.webp 1080w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3c34465e3acfa120c_e5-p-1600.webp 1600w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3c34465e3acfa120c_e5-p-2000.webp 2000w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3c34465e3acfa120c_e5.webp 2507w"
        />
        </div>

        <div className="Alpha_details_block_1_right">
          <div className="Alpha_details_block_1_right_para_1">
            The Epigenetic Indicators highlight accumulated information, which
            may assist in alerting us to environmental impacts such as Electro
            Smog or chemical irritants as well as nutritional imbalances and
            underlying food stressors (not allergies). The information of each
            personalized report empowers each client with the ability to
            optimise their wellbeing and performance.
          </div>
        </div>
      </section>

      <section className="Alpha_details_block_2">
        <div className="Alpha_details_block_2_para">
          Our German Epigenetic mapping and indexing program ranks the
          intensities, before using the data to generate the charts contained in
          the Epigenetic Environmental Statements and nutritional optimization
          maps.
        </div>

        <div className="Alpha_details_block_2_para">
          Each 34-page map reflects the personal environmental influences which
          could be impacting your animal as seen through the information
          gathered by the S-Drive. The mapping covers the following categories
          and items.
        </div>
      </section>

      <section className="Alpha_details_block_3">
        <div className="Alpha_details_block_3_left">
          <div className="Alpha_details_block_3_left_para_1">
            • Vitamins x 16 most common
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Minerals x 16 most common
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Essential Fatty Acids x 6
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Antioxidant x 13 groups
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Amino Acids x 23
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Toxins – Chemicals, Radiation, Toxic Metals
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Microbiology – Bacteria, Fungus
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Moulds/Spores, Parasites, Virus
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Electro Smog EMF & ELF x 14 major categories
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Gut and Intestinal Stressors
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Circulatory Stressors
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Muscle recovery Stressors
          </div>
          <div className="Alpha_details_block_3_left_para_1">
            • Food intolerances and food additives to avoid
          </div>
        </div>
        <div className="Alpha_details_block_3_right" style={{position:"relative"}}>
          <Image
            alt="image"
            layout="fill"
            objectFit="contain"
            src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6.webp"
            srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6-p-800.webp 800w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6-p-1080.webp 1080w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6-p-1600.webp 1600w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6-p-2000.webp 2000w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6-p-2600.webp 2600w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3154efbc25cae5e07_e6.webp 2940w"
          />
        </div>
      </section>

      <section className="Alpha_details_block_3">
        <div className="Alpha_details_block_3_left">
          <div className="Alpha_details_block_3_left_para_1">
            The nine assessed categories are ranked according to their overall
            status within the group. The aggregated scores present a picture of
            which categories are possibly having the highest impact and these
            are marked as ‘priorities’ and below these we have the secondary
            categories marked ‘advisory’. This provides some depth to the
            information which helps users to focus on supporting the cells in
            the most productive way.
          </div>
          <div className="Alpha_details_block_3_left_para_2">
            {" "}
            Within each category highlighted, we number the items according to
            their priority ranking, again making it easier to see where to start
            with nutritional protocols. The summary page captures all of this
            information in one easy-to-read table, listed in priority order with
            suggested actions.
          </div>
          <div className="Alpha_details_block_3_left_para_3">
            Included in the reports Information is a suggested 60-day Protocol
            which highlights specific foods to obtain optimal nutritional value
            and foods to avoid. The metabolic system requires time to adjust
            which is why we suggest a 60-Day protocol, before the next
            epigenetic assessment is conducted.
          </div>
        </div>
        <div className="Alpha_details_block_3_right" style={{position:"relative"}}>
          <Image
            layout="fill"
            alt="image"
            objectFit="contain"
            src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3d036d8798f1d8786_e7.webp"
            srcSet="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3d036d8798f1d8786_e7-p-500.webp 500w, https://uploads-ssl.webflow.com/63f7267539759cafd312faae/64070ef3d036d8798f1d8786_e7.webp 692w"
          />
        </div>
      </section>
    </div>
    <Footer/>
    </>

  );
};

export default Epigenetics;