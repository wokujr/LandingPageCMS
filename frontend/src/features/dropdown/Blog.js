import { useRouter } from "next/router";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function Blog() {
  const router = useRouter();
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                 Blog
                <AccordionIcon />
              </div>
            </AccordionButton>
          </h2>
          <AccordionPanel className="flex flex-col space-y-2 border-2 border-black p-3 rounded-lg w-full ">
            <span
              className="hover:cursor-pointer"
              onClick={() => router.push("aboutus/aboutcompany")}
            >
             Publish
            </span>
            <span
              className="hover:cursor-pointer"
              onClick={() => router.push("about-us/team")}
            >
              Draf
            </span>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default Blog