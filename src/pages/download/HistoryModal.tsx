import { Button, Modal, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { convertToExpectedOutputJson } from "src/helpers/format-json";
import { DownloadServices } from "src/services/download-service";

const HistoryModal = ({
  isOpenModal,
  dataVersions,
  handleCloseModal,
  fetchDataVersions,
  hasMoreInModalTable,
}: {
  isOpenModal: boolean;
  dataVersions: any;
  handleCloseModal: any;
  fetchDataVersions: any;
  hasMoreInModalTable: any;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const downloadService = new DownloadServices();

  const columns = [
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
      render: (_: any, item: any) => {
        return <span>{item?.file_name}_v{item?.version}.json</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "last_update",
      key: "last_update",
      render: (_: any, item: any) => {
        return (
          <span>{moment(item?.updated_at).format("DD/MM/YYYY HH:mm")}</span>
        );
      },
    },
    {
      title: "Download",
      key: "download",
      render: (_: any, item: any) => (
        <span
          style={{ color: "#1890ff", cursor: "pointer" }}
          onClick={() => handleDownloadFileVersion(item)}
        >
          Download
        </span>
      ),
    },
  ];

  const fetchDataAsync = async () => {
    await fetchDataVersions(currentPage + 1);
    setCurrentPage((prev) => prev + 1);
  };

  const handleDownloadFileVersion = async (ver: any) => {
    const res = await downloadService.downloadFileVersion({
      filename: ver?.file_name,
      version: ver?.version,
    });
    const { data } = res?.data;

    const file_id = data?.asset?.file_id;
    const outputJson = convertToExpectedOutputJson(data);

    const jsonData = JSON.stringify(outputJson, null, 2); // Convert data to JSON string with 2 spaces indentation
    const blob = new Blob([jsonData], { type: "application/json" }); // Create a Blob with the JSON data
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    const link = document.createElement("a");
    link.href = url;
    link.download = `${file_id}_v${ver?.version}`; // Specify the file name
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      open={isOpenModal}
      title="History"
      onCancel={handleCloseModal}
      footer={[
        <Button key="ok" type="primary" onClick={handleCloseModal}>
          Back
        </Button>,
      ]}
    >
      <InfiniteScroll
        dataLength={dataVersions.length}
        next={fetchDataAsync}
        hasMore={hasMoreInModalTable}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        height={300}
        scrollThreshold={0.9}
      >
        <Table
          dataSource={dataVersions || []}
          columns={columns}
          pagination={false}
        />
      </InfiniteScroll>
    </Modal>
  );
};

export default HistoryModal;
