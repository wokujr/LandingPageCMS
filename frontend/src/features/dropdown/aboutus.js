import { useRouter } from "next/router";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function AboutUs() {
  const router = useRouter();
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                About Us
                <AccordionIcon />
              </div>
            </AccordionButton>
          </h2>
          <AccordionPanel className="flex flex-col space-y-2 border-2 border-black p-3 rounded-lg w-full ">
            <span
              className="hover:cursor-pointer"
              onClick={() => router.push("/aboutus/aboutcompany")}
            >
              About Company
            </span>

            {/*hmmm can it join into about us*/}
            <span
                className="hover:cursor-pointer"
                onClick={() => router.push("/aboutus/aboutcompany/new")}
            >
              Add New About Us
            </span>

            <span
                className="hover:cursor-pointer"
                onClick={() => router.push("/aboutus/aboutcompany/list")}
            >
              Profile List
            </span>

            <span
              className="hover:cursor-pointer"
              onClick={() => router.push("/aboutus/team")}
            >
              Team
            </span>
            <span
              className="hover:cursor-pointer"
              onClick={() => router.push("/aboutus/contacts")}
            >
              Contacts
            </span>
            <span
              className="hover:cursor-pointer"
              onClick={() => router.push("/aboutus/gallery")}
            >
              Gallery
            </span>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default AboutUs