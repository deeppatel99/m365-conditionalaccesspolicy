// Dashboard page for authenticated users
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Login, useIsSignedIn } from "@microsoft/mgt-react";
import { callGraphApi } from "../graph";
import { GRAPH_ENDPOINTS } from "../graphEndpoints";
import { convertToCSV } from "../utils/csv";
import { getDateNDaysAgo } from "../utils/date";
import { SnackbarContext } from "../context/SnackbarContext";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  actionBarStyle,
  actionControlsStyle,
  outputBoxStyle,
  selectLabelStyle,
} from "../styles/dashboardStyles";

const exportFormats = [
  { value: "json", label: "JSON" },
  { value: "csv", label: "CSV" },
];

interface InactiveUser {
  displayName: string;
  userPrincipalName: string;
  lastSignInDateTime: string | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState("getInactiveUsers");
  const [exportFormat, setExportFormat] = useState("csv");
  const [response, setResponse] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const isSignedIn = useIsSignedIn()[0];
  const { showMessage } = React.useContext(SnackbarContext);

  React.useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedAction(event.target.value as string);
  };

  const handleExportFormatChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setExportFormat(event.target.value as string);
  };

  const handleSubmit = async () => {
    if (!isSignedIn) {
      showMessage("User is not authenticated. Please sign in first.", "error");
      setResponse("User is not authenticated. Please sign in first.");
      setResponseData(null);
      return;
    }
    setIsFetching(true);
    setShowLoadingOverlay(true);
    setResponse("");
    try {
      if (selectedAction === "getInactiveUsers") {
        const result = await callGraphApi<{ value: any[] }>(
          GRAPH_ENDPOINTS.users
        );
        const get90DaysAgo = getDateNDaysAgo(90);

        // filter by user.signInActivity?.lastSignInDateTime
        const inactiveUsers = (result.value || []).filter((user: any) => {
          const signInDate = user.signInActivity?.lastSignInDateTime
            ? new Date(user.signInActivity.lastSignInDateTime)
            : null;
          return signInDate && signInDate < get90DaysAgo;
        });

        // Extract only the required fields
        const filteredInactiveUsers = inactiveUsers.map((user: any) => ({
          displayName: user.displayName,
          userPrincipalName: user.userPrincipalName,
          lastSignInDateTime: user.signInActivity?.lastSignInDateTime || null,
        }));

        setResponseData({ value: filteredInactiveUsers });
        setResponse(JSON.stringify({ value: filteredInactiveUsers }, null, 2));
        showMessage(
          <span>
            <CheckCircleIcon
              sx={{ verticalAlign: "middle", color: "success.main", mr: 1 }}
            />
            Inactive users fetched successfully!
          </span>,
          "success"
        );
      } else {
        setResponse("Action not implemented.");
        setResponseData(null);
        showMessage("Selected action is not implemented.", "info");
      }
    } catch (error: any) {
      setResponse("Error: " + (error.message || "Unknown error"));
      setResponseData(null);
      showMessage(
        "Failed to fetch data: " + (error.message || "Unknown error"),
        "error"
      );
    }
    setIsFetching(false);
    setShowLoadingOverlay(false);
  };

  const handleExport = () => {
    if (!responseData) {
      showMessage("No data available to export!", "error");
      return;
    }
    setExporting(true);
    let blob, fileExtension;
    if (exportFormat === "csv") {
      const data = responseData.value || [];
      const csvData = convertToCSV(data);
      blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      fileExtension = "csv";
    } else {
      blob = new Blob([JSON.stringify(responseData, null, 2)], {
        type: "application/json",
      });
      fileExtension = "json";
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `response.${fileExtension}`;
    link.click();
    URL.revokeObjectURL(url);
    setExporting(false);
    showMessage(
      <span>
        <CheckCircleIcon
          sx={{ verticalAlign: "middle", color: "success.main", mr: 1 }}
        />
        Data exported successfully as {exportFormat.toUpperCase()}!
      </span>,
      "success"
    );
  };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", py: 0 }}>
      {/* Main Card */}
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, position: "relative" }}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            px: { xs: 2, sm: 6, md: 8 },
            py: { xs: 2, sm: 5 },
          }}
        >
          {showLoadingOverlay && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(255,255,255,0.7)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
              }}
            >
              <CircularProgress size={48} color="primary" />
            </Box>
          )}
          <CardContent>
            <Box sx={actionBarStyle}>
              {/* Left: Action controls */}
              <Box sx={actionControlsStyle}>
                <Box sx={selectLabelStyle}>Select an action:</Box>
                <FormControl sx={{ minWidth: 260 }} size="small">
                  <span style={{ display: "inline-block", width: "100%" }}>
                    <Select
                      displayEmpty
                      value={selectedAction}
                      onChange={handleActionChange}
                      inputProps={{ "aria-label": "Select an action" }}
                    >
                      <MenuItem value="getInactiveUsers">
                        Get inactive users (90 Days+)
                      </MenuItem>
                    </Select>
                  </span>
                </FormControl>
                <span style={{ display: "inline-block" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isFetching || !isSignedIn}
                    sx={{
                      height: 44,
                      minWidth: 120,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                    tabIndex={0}
                  >
                    {isFetching ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </span>
              </Box>
              {/* Right: User info and sign in, with improved UI */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                ml={{ sm: 3, xs: 0 }}
                mt={{ xs: 2, sm: 0 }}
              >
                <Login />
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight={600} mb={2}>
              Console Output
            </Typography>
            <Box sx={outputBoxStyle}>
              <TextField
                multiline
                minRows={14}
                maxRows={28}
                fullWidth
                value={response}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily:
                      "Fira Mono, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    background: "transparent",
                    border: "none",
                    fontSize: 16,
                  },
                  disableUnderline: true,
                }}
                variant="standard"
                sx={{ border: "none" }}
                placeholder="Results will appear here after you submit an action."
              />
              {!response && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  No data yet. Please select an action and click Submit.
                </Typography>
              )}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <FormControl size="small" sx={{ minWidth: 100, mr: 3 }}>
                <span style={{ display: "inline-block", width: "100%" }}>
                  <Select
                    value={exportFormat}
                    onChange={handleExportFormatChange}
                  >
                    {exportFormats.map((format) => (
                      <MenuItem key={format.value} value={format.value}>
                        {format.label}
                      </MenuItem>
                    ))}
                  </Select>
                </span>
              </FormControl>
              <span style={{ display: "inline-block" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExport}
                  disabled={!responseData || exporting}
                  sx={{
                    fontWeight: 600,
                    minWidth: 120,
                    fontSize: 16,
                    boxShadow: 2,
                    ":hover": { boxShadow: 4 },
                  }}
                  tabIndex={0}
                >
                  {exporting ? <CircularProgress size={24} /> : "Export"}
                </Button>
              </span>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
