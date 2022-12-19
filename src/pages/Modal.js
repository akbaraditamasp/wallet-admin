import { useRef } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

export default function ModalPage() {
  const _modalRef = useRef();
  return (
    <Layout active="Modal" pageTitle="Modal">
      <Card className="m-5">
        <Button
          type="button"
          color="green"
          onClick={() => {
            _modalRef.current.show();
          }}
        >
          Launch Modal
        </Button>
      </Card>
      <Modal ref={_modalRef} title="Test Modal">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        lobortis diam diam, commodo ultricies nulla consectetur vitae. Nam
        maximus pharetra elit, ac tristique turpis auctor in. Mauris suscipit ut
        orci in consequat. Aliquam erat volutpat. Ut laoreet congue est sit amet
        pretium. Etiam aliquet libero eget ante iaculis consectetur. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Vestibulum condimentum
        scelerisque ex id feugiat. Quisque eu massa sed elit fermentum pretium.
        Sed quis orci tincidunt, suscipit nulla ut, convallis nibh. Curabitur
        efficitur imperdiet mi, nec porta magna. Ut eget hendrerit odio. Integer
        semper in leo et tincidunt. Vestibulum sed bibendum urna, quis suscipit
        sapien.
      </Modal>
    </Layout>
  );
}
