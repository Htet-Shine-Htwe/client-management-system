import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ClientProvider with ChangeNotifier {
  List<dynamic> _clients = [];
  bool _isLoading = false;
  String _errorMessage = '';

  List<dynamic> get clients => _clients;
  bool get isLoading => _isLoading;
  String get errorMessage => _errorMessage;

  Future<void> fetchClients(String token) async {
    _isLoading = true;
    _errorMessage = '';
    notifyListeners();

    try {
      final response = await http.get(
        Uri.parse('http://localhost:8000/api/v1/clients'),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        // Extract the inner 'data' list from the outer 'data' object
        _clients = responseData['data']['data'] as List<dynamic>;
      } else {
        _errorMessage = 'Failed to load clients';
      }
    } catch (error) {
      _errorMessage = 'An error occurred: $error';
    }

    _isLoading = false;
    notifyListeners();
  }
}
