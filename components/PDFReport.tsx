import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

import { useTaskStore } from "../stores/taskStore";
import { useEffect } from "react";

type TaskObj = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginVertical: 8,
  },
  paddingPdf: {
    padding: 16,
  },
  marginBtm: {
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  containerHeader: {
    marginBottom: 12,
  },
  header: {
    fontSize: 10,
    marginBottom: 4,
  },
});

const currentDate = () => {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  return `${date} ${time}`;
};

const PDFReport = ({ tasks }: { tasks: TaskObj[] }) => {
  let parsing = JSON.parse(JSON.stringify(tasks));
  return (
    <Document>
      <Page>
        <View style={styles.paddingPdf}>
          <View style={styles.containerHeader}>
            <Text style={styles.header}>Date: {currentDate()}</Text>
            <Text style={styles.header}>Manage Task - Task Report</Text>
          </View>
          {parsing && parsing?.length > 0 ? (
            parsing.map((task: any, idx: any) => (
              <View key={task.id}>
                <Text style={styles.title}>
                  {task.title} - {task.completed ? "Done" : "Pending"}
                </Text>
                {task.description ? (
                  <Text style={styles.title}>{task.description}</Text>
                ) : (
                  ""
                )}
                {idx < tasks.length - 1 && <View style={styles.divider} />}
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.title}>No Task Found</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
export const PDFButton = () => {
  const { tasks, pdfReady, setPdfReady } = useTaskStore();

  useEffect(() => {
    setPdfReady(true);
  }, []);

  if (!pdfReady) return <button disabled>Loading PDF...</button>;

  return (
    <PDFDownloadLink
      document={
        <PDFReport
          tasks={tasks.map((task) => ({
            ...task,
            description: task.description ?? "",
          }))}
        />
      }
      fileName={`Manage Task - Task Report (${currentDate()}).pdf`}
      style={{ flexShrink: 0 }}
    >
      Download Report
    </PDFDownloadLink>
  );
};
