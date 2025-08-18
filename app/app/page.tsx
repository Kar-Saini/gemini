"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoImagesOutline, IoSend } from "react-icons/io5";

const App = () => {
  const [prompt, setPrompt] = useState<string>("");
  const inpRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inpRef.current?.focus();
  }, []);

  return (
    <div className="w-full flex flex-col-reverse  justify-start items-stretch h-full py-10">
      <div className="max-w-3xl w-full mx-auto flex flex-col-reverse h-full justify-between">
        <div className="flex flex-col w-full px-6 py-6 gap-6 border border-neutral-600 mx-auto rounded-3xl bg-neutral-900">
          <input
            ref={inpRef}
            type="text"
            placeholder="Ask Gemini"
            className="w-full bg-transparent outline-none text-neutral-200 placeholder-neutral-500 text-sm"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <div className="flex gap-6 text-neutral-400">
              <GoPlus
                size={20}
                className="hover:cursor-pointer hover:text-neutral-200"
              />
              <IoImagesOutline
                size={20}
                className="hover:cursor-pointer hover:text-neutral-200"
              />
            </div>
            {prompt && (
              <IoSend
                size={20}
                className="hover:cursor-pointer text-amber-400 hover:text-amber-500 transition-colors"
              />
            )}
          </div>
        </div>
        <div className=" max-h-95  overflow-y-auto   py-4 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, qui.
          Adipisci repellendus, fugiat veritatis hic quibusdam, molestiae dolor
          voluptatum tempore quod quasi consectetur placeat sequi expedita,
          natus ab. Sint quaerat dolores suscipit veritatis, nesciunt amet non
          est ducimus quo corrupti. Officiis doloremque debitis dignissimos amet
          odio tempora eveniet sed iste corporis. Magni culpa deleniti
          necessitatibus? Incidunt fuga expedita, error exercitationem vitae
          quaerat! Obcaecati illum modi veritatis nostrum perspiciatis, quo quas
          cupiditate cum? Labore expedita officiis facere cumque harum molestiae
          laborum maiores, perferendis illo aspernatur laboriosam, dolor
          quisquam eveniet repellendus, vitae incidunt hic iste illum nulla
          nobis veniam. Ullam cumque obcaecati vero nostrum dicta voluptatibus
          perspiciatis aut deserunt tempora quia excepturi repudiandae nam
          dignissimos dolor amet nemo maiores harum, laudantium atque rem,
          temporibus reprehenderit labore sint? Voluptate fuga cupiditate
          impedit voluptatibus nesciunt minus eos nulla, magnam commodi
          distinctio sequi! Exercitationem numquam saepe, sit nesciunt velit
          blanditiis, quia perspiciatis id eaque reprehenderit molestias est
          itaque sint aut voluptas tempore laudantium. Illo enim pariatur facere
          vitae laborum repudiandae qui. Mollitia, exercitationem ducimus. Harum
          saepe eius, voluptatum in possimus ipsum. Perferendis tempora at hic,
          illum enim numquam quod ad voluptates laudantium vitae odit dolor quo
          possimus quis ratione deleniti placeat magni modi sunt corporis
          laborum. Labore ut tenetur, cum saepe, quisquam laudantium praesentium
          iure in esse modi, a eaque corrupti natus asperiores deserunt eos?
          Sed, repellendus a consequuntur suscipit tenetur dolorum doloremque
          rem earum saepe! Molestiae, tenetur ipsum. Facilis aspernatur
          distinctio quibusdam, praesentium, dolor facere ratione labore nostrum
          nulla nemo temporibus ex qui iusto dolore! Atque quibusdam ipsa neque
          consectetur officiis placeat blanditiis inventore ducimus tempore esse
          accusantium quasi necessitatibus sit ex delectus officia pariatur
          distinctio natus dolor sequi, quam soluta. In delectus ratione et
          repellat voluptatibus doloribus sapiente ipsum! Quod hic assumenda
          autem repellendus atque ex itaque similique odit temporibus veritatis,
          quam corrupti delectus unde rerum incidunt in blanditiis reprehenderit
          alias et suscipit obcaecati cum provident natus fugit! Aperiam sequi
          obcaecati dolorem alias quisquam placeat. Magni, esse beatae eos
          ducimus nesciunt non deleniti optio repellat ad reprehenderit
          accusantium architecto provident suscipit explicabo laborum blanditiis
          et sit ut ratione corrupti! Autem tenetur ducimus enim nam distinctio,
          sequi voluptate libero est? Repudiandae obcaecati quas, autem
          voluptatibus consectetur dolorem ratione. Dolorem commodi nemo soluta
          dolores quidem optio quia eveniet quo, pariatur voluptatem, ipsa
          quaerat a laborum et tempora error amet repellat exercitationem nisi
          aliquam. Exercitationem nihil magnam totam praesentium! Dolores
          blanditiis sapiente laudantium maiores velit asperiores odit.
          Quibusdam molestias porro voluptas repudiandae veritatis quaerat
          ducimus alias ea. Repellat, vel atque! At facere vitae porro, ratione
          facilis voluptatum voluptate ab praesentium tempore, illum nesciunt,
          ea consectetur quaerat totam neque cupiditate. Quasi tenetur suscipit,
          dolores blanditiis ab adipisci autem consequuntur corporis incidunt
          exercitationem minus libero, pariatur, natus nobis voluptatibus
          officiis cupiditate odit. Veniam, temporibus explicabo cumque earum
          vel iusto sapiente voluptatem fugiat quae. Sit ducimus a magnam
          repellendus eum officiis ad exercitationem in, repellat blanditiis
          delectus aliquam neque ullam voluptatem ratione! Excepturi sed
          quibusdam error impedit expedita officiis magni velit, vel quo iusto
          natus facilis eligendi commodi. Officia excepturi culpa nostrum
          assumenda, magnam laudantium maxime eius saepe. Eos, quo incidunt
          officiis minima, accusamus dolore architecto nostrum enim quibusdam
          optio animi quia, doloribus eius quam voluptatibus inventore sunt
          nulla. Deleniti voluptatibus eligendi officiis omnis eaque numquam
          sequi laborum, consequuntur debitis expedita quisquam earum provident
          error quo porro suscipit laboriosam autem illo ipsam ipsa enim.
          Perferendis tenetur nesciunt, odio sed corrupti eligendi,
          necessitatibus reprehenderit ratione incidunt ducimus ipsa laudantium
          reiciendis repudiandae! Architecto iste cum veniam dolores expedita
          ducimus earum labore autem eligendi, ipsa illum magni perferendis
          fugit quidem. Veritatis fuga ullam, aliquam eos dignissimos, rerum
          ipsa ut omnis sed nesciunt recusandae, quam in provident saepe.
          Voluptatum fuga esse deleniti recusandae soluta quidem quaerat
          similique amet totam temporibus reiciendis ratione blanditiis eos
          impedit, animi, ipsum nemo? Pariatur vitae consequuntur, facilis harum
          commodi labore aspernatur dolorum iure distinctio accusamus. Quos
          voluptatibus itaque vitae, facilis eaque neque, odit adipisci, magnam
          earum facere corporis! Velit tempore omnis, reprehenderit quo dolor
          iusto blanditiis ullam accusantium tempora fuga dolorum rerum iure
          debitis pariatur voluptate nulla perspiciatis fugit odit, corporis
          incidunt, sapiente cum ea ex reiciendis. Odit, aperiam unde! Repellat
          eum vitae aspernatur iste harum fugiat unde nulla numquam rerum.
          Facere cupiditate quasi maxime obcaecati error odio et reiciendis,
          corporis tempora voluptatum exercitationem architecto similique hic
          fugit quidem? Ipsam, excepturi! Et aliquid iste deserunt numquam
          inventore quisquam amet veniam accusamus mollitia dignissimos.
          Quaerat, recusandae pariatur. A, quod rerum, nulla deserunt eveniet ab
          fuga officiis iste unde voluptatem aspernatur maiores necessitatibus
          laudantium blanditiis provident. Velit consectetur inventore
          praesentium dignissimos itaque ducimus cum aliquid ipsam repudiandae
          fugiat perspiciatis, eligendi, hic nam est nisi? Eveniet, expedita
          quibusdam. Eum ex eos iure voluptate, totam, nulla mollitia quo
          quaerat deleniti corrupti consequuntur! Eos consectetur neque, vitae,
          optio eveniet placeat earum provident labore rerum illum autem.
          Veritatis quia architecto quam quae nemo facilis sequi autem inventore
          officiis ullam impedit suscipit distinctio accusantium, placeat ut quo
          voluptatum necessitatibus dignissimos provident voluptates? Suscipit
          veniam, perspiciatis vitae ad, iste hic modi molestiae saepe velit
          autem harum voluptatem temporibus cumque? Esse harum nisi perferendis
          atque quibusdam pariatur! Vel impedit ullam voluptas incidunt, fugit
          ab soluta accusantium alias, sunt iste id in laborum accusamus,
          officiis quae maxime reiciendis? Officia laborum tenetur sed velit
          saepe quam, magni aliquid eum, ducimus neque, aperiam sit nisi
          consectetur nemo voluptatem veniam. Odio eum quam quis tempora aut
          perferendis enim accusantium. Doloribus ducimus aspernatur
          consequuntur eos, velit sequi, dolorem tenetur, doloremque quia ipsa
          minus obcaecati! Et vel eius delectus exercitationem at repellendus
          blanditiis pariatur dolore ipsa enim similique quae impedit nihil
          officiis, nam suscipit commodi alias doloribus fugit! Quae id illum
          blanditiis provident vitae? Voluptatum odit debitis perferendis
          pariatur sit corporis incidunt. Nam at necessitatibus laborum, quidem
          maiores laudantium quia distinctio a ullam quam architecto deserunt
          quae odio officia, praesentium quibusdam. Necessitatibus nihil aperiam
          sint! Error accusantium exercitationem culpa ipsa deserunt a quos
          repellat, omnis sed! Dolores excepturi quos natus numquam est
          praesentium? Magni, consequuntur debitis doloremque at porro sunt
          autem eligendi tempora asperiores aperiam corporis velit, veniam
          nesciunt, cupiditate delectus voluptate enim!
        </div>
      </div>
    </div>
  );
};

export default App;
