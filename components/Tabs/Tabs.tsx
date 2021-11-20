import { Tab } from "@headlessui/react";
import ContributerProvider from "../../context/contributorContext";
import Contributors from "../Contributors/Contributors";
import SearchRepos from "../SearchRepos/SearchRepos";
import SearchUser from "../SearchUser/SearchUser";

function MyTabs() {
  return (
    <ContributerProvider>
      <div className="mt-5">
        <Tab.Group defaultIndex={1}>
          <Tab.List className="flex gap-3">
            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-purple-300 flex-1 border-[1px] py-6 border-purple-600"
                  : "flex-1 border-[1px] py-6 border-purple-600"
              }
            >
              Search Users
            </Tab>

            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-purple-300 flex-1 border-[1px] py-6 border-purple-600"
                  : "flex-1 border-[1px] py-6 border-purple-600"
              }
            >
              Search Repository
            </Tab>
            {/* <Tab
              className={({ selected }) =>
                selected
                  ? "bg-purple-300 flex-1 border-[1px] py-6 border-purple-600"
                  : "flex-1 border-[1px] py-6 border-purple-600"
              }
            >
              Search Contributor in GitHub Repository
            </Tab> */}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <SearchUser />
            </Tab.Panel>
            <Tab.Panel>
              <SearchRepos />
            </Tab.Panel>
            {/* <Tab.Panel>
              <Contributors />
            </Tab.Panel> */}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </ContributerProvider>
  );
}
export default MyTabs;
