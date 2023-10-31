import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
  message,
} from "antd";
import JSZip from "jszip";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { FILE_STATUS } from "src/constants";
import { UploadContext } from "src/contexts/upload";
import { convertToExpectedOutputJson } from "src/helpers/format-json";
import { DownloadServices } from "src/services/download-service";
import HistoryModal from "./HistoryModal";
import "./styles.scss";
import { DOWNLOAD_UPDATE_TIMEOUT } from "src/constants/time";

const PAGE_SIZE = 10;

const DownloadPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pickedFile, setPickedFile] = useState<any>();
  const [dataVersions, setDataVersions] = useState<any[]>([]);
  const [hasMoreInModalTable, setHasMoreInModalTable] = useState(false);
  const [searchData, setSearchData] = useState({});

  const { tabs } = useContext(UploadContext);
  const downloadService = new DownloadServices();

  const resetAllState = () => {
    setLoading(false);
    setData([]);
    setCurrentPage(1);
    setTotalPage(1);
    setIsOpenModal(false);
    setPickedFile(null);
    setDataVersions([]);
    setHasMoreInModalTable(false);
    setSearchData({});

    form.resetFields();
  };

  // table section
  const columns = [
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
      render: (_: any, item: any) => (
        <span
          style={{ color: "#1890ff", cursor: "pointer" }}
          onClick={() => handleOpenModal(item)}
        >
          {item?.asset?.file_id}.json
        </span>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (_: any, item: any) => {
        return <span>{item?.asset?.sku}</span>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (_: any, item: any) => {
        return (
          <span>
            {moment(item?.asset?.updated_at).format(
              "DD/MM/YYYY HH:mm"
            )}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, item: any) => {
        return (
          <span>
            {item?.asset?.status === FILE_STATUS.PROCESSING
              ? "Processing"
              : item?.asset?.status === FILE_STATUS.RECORDED
                ? "Recorded"
                : item?.asset?.status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, item: any) => {
        return (
          <span
            style={{
              color:
                item?.asset?.status === FILE_STATUS.RECORDED
                  ? "#1890ff"
                  : "gray",
              cursor:
                item?.asset?.status === FILE_STATUS.RECORDED
                  ? "pointer"
                  : "not-allowed",
            }}
            onClick={() => handleDownload(item)}
          >
            Download
          </span>
        );
      },
    },
  ];

  const handleDownload = (data: any) => {
    if (data?.asset?.status !== FILE_STATUS.RECORDED) return;

    const file_id = data?.asset?.file_id;

    const outputJson = convertToExpectedOutputJson(data);
    const jsonData = JSON.stringify(outputJson, null, 2); // Convert data to JSON string with 2 spaces indentation
    const blob = new Blob([jsonData], { type: "application/json" }); // Create a Blob with the JSON data
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    const link = document.createElement("a");
    link.href = url;
    link.download = file_id; // Specify the file name
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    data.forEach((item, index) => {
      if (item?.asset?.status === FILE_STATUS.RECORDED) {
        const file_id = item?.asset?.file_id;
        const outputJson = convertToExpectedOutputJson(item);
        const jsonData = JSON.stringify(outputJson, null, 2);
        zip.file(`${file_id}.json`, jsonData);
      }
    });

    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: "blob" });

    // Get the current date and time
    const currentDate: Date = new Date();
    let day: number | string = currentDate.getDate();
    let month: number | string = currentDate.getMonth() + 1; // Months are zero-based
    const year: number = currentDate.getFullYear();
    let hours: number | string = currentDate.getHours();
    let minutes: number | string = currentDate.getMinutes();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Generate the filename with the current date and time
    const fileName = `${day}_${month}_${year}_${hours}${minutes}.zip`;

    // Create a temporary <a> element and set the zip file as its href
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(zipContent);
    downloadLink.download = fileName;

    // Trigger the download by simulating a click on the <a> element
    downloadLink.click();

    // Clean up the temporary <a> element
    URL.revokeObjectURL(downloadLink.href);
    downloadLink.remove();
  };

  // search form section
  const getDataSearchFromForm = () => {
    const { file_name, batch_id, sku, send_date } = form.getFieldsValue();
    let start_date;
    let end_date;
    if (send_date) {
      start_date = send_date[0]?.startOf("day").toDate().getTime();
      end_date = send_date[1]?.endOf("day").toDate().getTime();
    }
    return {
      file_name,
      sku,
      batch_id,
      start_date,
      end_date,
    };
  };

  const handleSearch = async (values: any) => {
    const searchFormData = getDataSearchFromForm();

    setSearchData(searchFormData);
    setCurrentPage(1);
    await fetchDataAsync(true, { ...searchFormData, page: 1 });
  };

  const handleSearchFailed = (errorInfo: any) => {
    console.log("Form validation failed:", errorInfo);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleTableChange = (newPagination: any) => {
    setCurrentPage(newPagination.current);
    fetchDataAsync(true, {
      ...searchData,
      page: newPagination.current,
    });
  };

  // fetch data
  const fetchDataAsync = async (loading: boolean = true, params?: any) => {
    try {
      setLoading(loading);

      const res = await downloadService.getAllFiles({
        ...params,
        sort_field: "created_at",
        sort_direction: "DESC",
        limit: PAGE_SIZE,
      });
      const { data } = res?.data;

      setData(data?.items);
      setTotalPage(data?.meta?.total_items);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      message.error(err?.message);
      setLoading(false);
    }
  };

  const fetchDataVersions = async (page: any, params?: any) => {
    const filename = pickedFile?.asset?.file_id;
    const res = await downloadService.getAllVersionOfFile(filename, {
      ...params,
      limit: PAGE_SIZE,
      page: page,
    });
    const { data } = res?.data;
    setDataVersions((prev) => [...prev, ...data?.items]);
    setHasMoreInModalTable(
      dataVersions.length + data?.meta?.item_count < data?.meta?.total_items
        ? true
        : false
    );
  };

  // spinner loading
  const CustomSpinner = () => (
    <tbody>
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "center" }}>
          <div className="custom-spinner" />
          <div className="spinner-content">Loading...</div>
        </td>
      </tr>
    </tbody>
  );

  // handle open modal
  const handleOpenModal = (data: any) => {
    setIsOpenModal(true);
    setPickedFile(data);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setDataVersions([]);
    setPickedFile(null);
  };

  useEffect(() => {
    if (tabs.currentTab === "download") {
      fetchDataAsync(true, { limit: PAGE_SIZE });
    } else {
      resetAllState();
    }
  }, [tabs.currentTab]);

  useEffect(() => {
    if (pickedFile) {
      fetchDataVersions(1);
    }
  }, [pickedFile]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDataAsync(false, { page: currentPage, ...searchData });
    }, DOWNLOAD_UPDATE_TIMEOUT);

    return () => {
      clearInterval(interval);
    };
  }, [searchData, currentPage]);

  return (
    <div className="download-page">
      <div className="download-page__search-form">
        <SearchFrom
          form={form}
          handleSearch={handleSearch}
          handleSearchFailed={handleSearchFailed}
          loading={loading}
          handleReset={handleReset}
        />
      </div>

      <div className="download-page__download-all-btn">
        <Button
          disabled={data.length > 0 ? false : true}
          type="primary"
          htmlType="submit"
          onClick={handleDownloadAll}
        >
          Download all
        </Button>
      </div>

      <div className="download-page__table">
        <Table
          dataSource={data}
          columns={columns}
          components={{
            body: {
              wrapper: loading ? CustomSpinner : undefined,
            },
          }}
          onChange={handleTableChange}
          pagination={{
            current: currentPage,
            total: totalPage,
            pageSize: PAGE_SIZE,
            position: ["bottomRight"],
            showSizeChanger: false,
          }}
        />
      </div>
      <div className="download-page__history-modal">
        <HistoryModal
          isOpenModal={isOpenModal}
          dataVersions={dataVersions}
          handleCloseModal={handleCloseModal}
          fetchDataVersions={fetchDataVersions}
          hasMoreInModalTable={hasMoreInModalTable}
        />
      </div>
    </div>
  );
};

const hasProcessingFile = (files: any[]) => {
  for (let file of files) {
    if (file?.asset?.status === FILE_STATUS.PROCESSING) return true;
  }

  return false;
};

export const SearchFrom = ({
  form,
  handleSearch,
  handleSearchFailed,
  loading,
  handleReset,
}: any) => {
  return (
    <Form
      form={form}
      onFinish={handleSearch}
      onFinishFailed={handleSearchFailed}
      initialValues={{
        file_name: "",
        sku: "",
        batch_id: "",
        sendDate: null,
      }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="File Name" name="file_name">
            <Input disabled={loading} placeholder="Please enter" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="SKU" name="sku">
            <Input disabled={loading} placeholder="Please enter" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Batch ID" name="batch_id">
            <Input disabled={loading} placeholder="Please enter" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            className="form-item__date"
            label="Send Date"
            name="send_date"
          >
            <DatePicker.RangePicker
              onCalendarChange={(e) => {
                form.setFieldValue("send_date", e);
              }}
              onChange={() => false}
              disabled={loading}
            />
          </Form.Item>
        </Col>

        <Col span={8} style={{ textAlign: "right" }}>
          <Form.Item className="form-item__action">
            <Button htmlType="button" onClick={handleReset}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DownloadPage;
